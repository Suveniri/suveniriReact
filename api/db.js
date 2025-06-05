import mime from "react-native-mime-types";
import { supabase } from "../config/supabase";

export const fetchAllSouvenirs = async () => {
  const { data, error } = await supabase.from("souvenirs").select("*");

  if (error) {
    console.error("Error fetching souvenirs:", error);
    return [];
  }
  return data;
};

export const fetchSeasons = async () => {
  const { data, error } = await supabase
    .from("souvenir_yearly_data")
    .select("year")
    .order("year", { ascending: false });

  if (error) {
    console.error("Error fetching seasons:", error);
    return [];
  }

  const currentYear = new Date().getFullYear();

  const uniqueYears = [...new Set(data.map((item) => item.year))].filter(
    (year) => year < currentYear
  );
  return uniqueYears;
};

export const fetchSouvenirsForSingleSeason = async (year) => {
  const { data, error } = await supabase
    .from("souvenir_yearly_data")
    .select(
      `
            quantity_ordered,
            quantity_sold,
            revenue,
            souvenir_id,
            souvenirs (
                name,
                price,
                image_url
            )    
        `
    )
    .eq("year", year);

  if (error) {
    console.error(`Error fetching souvenirs for year ${year}: `, error);
    return [];
  }

  return data.map((entry) => ({
    id: `${entry.souvenir_id}-${year}`,
    quantityOrdered: entry.quantity_ordered,
    quantitySold: entry.quantity_sold,
    revenue: entry.revenue,
    name: entry.souvenirs?.name ?? "Unknown",
    price: entry.souvenirs?.price ?? 0,
    imageUrl: entry.souvenirs?.image_url ?? null,
  }));
};

export const saveSouvenirChanges = async (
  souvenir,
  newName,
  newPrice,
  newImage
) => {
  const timestamp = Date.now();
  const fileName = `${souvenir.id}-${timestamp}.jpg`;

  let imageUrl = souvenir.image_url;

  if (newImage) {
    removeOldImage(imageUrl);
    imageUrl = await uploadImage(newImage, fileName);
    if (!imageUrl) {
      alert("Greška pri dodavanju slike.");
      return [];
    }
  }

  const { data, error } = await supabase
    .from("souvenirs")
    .update({
      name: newName || souvenir.name,
      price: newPrice || souvenir.price,
      image_url: imageUrl || souvenir.image_url,
    })
    .eq("id", souvenir.id);

  if (error) {
    console.error(`Error fetching ${souvenir}: `, error);
    return [];
  } else {
    console.log("successfully updated souvenir: ", data);
  }
};

export const createNewSouvenir = async (newName, newPrice, newImage) => {
  const fileName = `${newName.replace(/[^a-zA-Z ]/g, "")}.jpg`;

  if (!newName || !newPrice) {
    alert("Ispuni sva polja!");
    return [];
  }

  let imageUrl = newImage;

  if (newImage) {
    imageUrl = await uploadImage(newImage, fileName);
    if (!imageUrl) {
      alert("Greška pri dodavanju slike.");
      return [];
    }
  }

  const { data, error } = await supabase.from("souvenirs").insert({
    name: newName,
    price: newPrice,
    image_url: imageUrl,
  });

  if (error) {
    console.error(`Error adding new souvenir: `, error);
    return [];
  } else {
    console.log("successfully added souvenir: ", data);
  }
};

export const deleteSouvenir = async (souvenir) => {
  const { data, error } = await supabase
    .from("souvenirs")
    .delete()
    .eq("id", souvenir.id);

  if (error) {
    console.error(`Error fetching ${souvenir}: `, error);
    return [];
  } else {
    console.log("delete successfull: ", data);
  }
};

export const removeOldImage = async (oldImageUrl) => {
  const filePath = oldImageUrl.split("/").slice(-2).join("/");
  const { error } = await supabase.storage
    .from("suveniri-bucket")
    .remove([filePath]);

  if (error) {
    console.error("Failed to remove old image:", error);
  }
};

export const uploadImage = async (uri, fileName) => {
  try {
    const fileType = mime.lookup(uri) || "image/jpeg";

    const { data, error } = await supabase.storage
      .from("suveniri-bucket")
      .upload(
        `suveniri_slike/${fileName}`,
        {
          uri,
          type: fileType,
          name: fileName,
        },
        {
          contentType: fileType,
          upsert: true,
        }
      );

    if (error) {
      throw error;
    }

    const { data: publicURLData } = supabase.storage
      .from("suveniri-bucket")
      .getPublicUrl(`suveniri_slike/${fileName}`);

    return publicURLData.publicURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};
