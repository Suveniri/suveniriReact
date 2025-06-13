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

export const initializeSouvenirsForCurrentYear = async () => {
  const currentYear = new Date().getFullYear();

  const { data: allSouvenirs, error: fetchError } = await supabase
    .from("souvenirs")
    .select("id, price");

  if (fetchError) {
    console.error("Error fetching souvenirs:", fetchError);
    return;
  }

  const { data: existingData, error: existingError } = await supabase
    .from("souvenir_yearly_data")
    .select("souvenir_id")
    .eq("year", currentYear);

  if (existingError) {
    console.error("Error checking existing yearly data:", existingError);
    return;
  }

  const existingIds = new Set(existingData.map((entry) => entry.souvenir_id));

  const newEntries = allSouvenirs
    .filter((souvenir) => !existingIds.has(souvenir.id))
    .map((souvenir) => ({
      year: currentYear,
      souvenir_id: souvenir.id,
      quantity_ordered: 0,
      quantity_sold: 0,
      revenue: 0,
    }));

  if (newEntries.length === 0) {
    return;
  }

  const { data: insertData, error: insertError } = await supabase
    .from("souvenir_yearly_data")
    .insert(newEntries);

  if (insertError) {
    console.error("Error inserting yearly data:", insertError);
  } else {
    console.log("Successfully initialized yearly data:", insertData);
  }
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
    // revenue: entry.revenue,
    revenue: entry.quantity_sold * entry.souvenirs?.price ?? 0,
    name: entry.souvenirs?.name ?? "Unknown",
    price: entry.souvenirs?.price ?? 0,
    image_url: entry.souvenirs?.image_url ?? null,
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
    if (error.code === "23505") {
      alert("Suvenir tog imena već postoji!");
    } else {
      console.error(`Error editing souvenir: `, error);
      alert("Grešla pri izmjeni podataka suvenira!");
    }
  }
};

export const createNewSouvenir = async (newName, newPrice, newImage) => {
  const fileName = `${newName.replace(/[^a-zA-Z ]/g, "")}.jpg`;

  if (!newName || !newPrice || !newImage) {
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
    if (error.code === "23505") {
      alert("Suvenir tog imena već postoji!");
    } else {
      console.error(`Error adding new souvenir: `, error);
      alert("Grešla pri dodavanju novog suvenira!");
    }
  } else {
    console.log("successfully added souvenir: ", data);
  }
};

export const deleteSouvenir = async (souvenir) => {
  const { data: usedData, error: checkError } = await supabase
    .from("souvenir_yearly_data")
    .select("souvenir_id")
    .eq("souvenir_id", souvenir.id)
    .limit(1);

  removeOldImage(souvenir.imageUrl);

  if (checkError) {
    console.error(`Error checking souvenir usage:`, checkError);
    return [];
  }
  if (usedData.length > 0) {
    alert(
      "Ovaj suvenir je već prodavan u prethodnim sezonama i ne može biti obrisan."
    );
    return [];
  }

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

export const updateSelledOrderedQuantities = async (
  souvenir,
  isPlusOrder,
  isPlusSelled,
  newOrderQuantity,
  newSelledQuantity
) => {
  const { data, error } = await supabase
    .from("souvenir_yearly_data")
    .update({
      quantity_sold: isPlusSelled
        ? Number(souvenir.quantitySold) + Number(newSelledQuantity)
        : Number(souvenir.quantitySold) - Number(newSelledQuantity),
      quantity_ordered: isPlusOrder
        ? Number(souvenir.quantityOrdered) + Number(newOrderQuantity)
        : Number(souvenir.quantityOrdered) - Number(newOrderQuantity),
    })
    .eq("souvenir_id", souvenir.id.slice(0, -5))
    .eq("year", new Date().getFullYear());

  if (error) {
    console.error(`Error fetching ${souvenir}: `, error);
    return [];
  }
};

export const updateRevenue = async (souvenir) => {
  const { data, error } = await supabase
    .from("souvenir_yearly_data")
    .update({
      revenue: Number(souvenir.quantitySold) * souvenir.price,
    })
    .eq("souvenir_id", souvenir.id.slice(0, -5))
    .eq("year", new Date().getFullYear());

  if (error) {
    console.error("Error updating revenue:", error);
    return;
  }
};
