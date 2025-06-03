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
            id,
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
    id: entry.id,
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
  const { data, error } = await supabase
    .from("souvenirs")
    .update({
      name: newName || souvenir.name,
      price: newPrice || souvenir.price,
      image_url: newImage || souvenir.image_url,
    })
    .eq("id", souvenir.id);

  if (error) {
    console.error(`Error fetching ${souvenir}: `, error);
    return [];
  } else {
    console.log("successfully updated souvenir: ", data);
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
