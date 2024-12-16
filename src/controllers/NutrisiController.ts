import { NutrisiModel } from "@/models/NutrisiModel";

export const getNutrisiData = (): NutrisiModel[] => {
  return [
    {
      fase: "Fase Menstruasi",
      deskripsi: "Yuk, penuhi kebutuhan nutrisi tubuh Anda selama fase menstruasi agar tetap sehat dan bertenaga!",
      buttonLabel: "Baca",
      backgroundColor: "#20184A", 
      textColor: "#FFFFFF", 
      buttonColor: "#AFA9D2", 
      route: "/fase-menstruasi",
    },
    {
      fase: "Fase Folikular",
      deskripsi: "Yuk, optimalkan energi dan persiapkan tubuh Anda dengan nutrisi tepat selama fase folikular agar tetap sehat dan bugar!",
      buttonLabel: "Baca",
      backgroundColor: "#FFE3F1", 
      textColor: "#20184A", 
      buttonColor: "#ECA8BB", 
      route: "/fase-folikular",
    },
    {
      fase: "Fase Ovulasi",
      deskripsi: "Dukung tubuh Anda selama fase ovulasi dengan asupan nutrisi yang menjaga kesehatan hormon dan meningkatkan kesuburan.",
      buttonLabel: "Baca",
      backgroundColor: "#ECA8BB", 
      textColor: "#FFFFFF", 
      buttonColor: "#FFE3F1", 
      route: "/fase-ovulasi",
    },
    {
      fase: "Fase Luteal",
      deskripsi: "Di fase luteal, tubuh membutuhkan asupan nutrisi yang membantu mengurangi gejala PMS. Yuk, intip nutrisi apa yang diperlukan!",
      buttonLabel: "Baca",
      backgroundColor: "#AFA9D2", 
      textColor: "#FFFFFF", 
      buttonColor: "#20184A", 
      route: "/fase-luteal",
    },
  ];
};
