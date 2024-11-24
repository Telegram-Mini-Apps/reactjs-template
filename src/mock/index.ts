import { HapinessStatuses } from "@/constants/bussiness";

export const MOCK_CLOTHES = [
  {
    id: 1,
    name: "Шапка крутая пиратская",
    description: "Шапка крутая пиратская шапка",
    photo: "assets/hat.png",
    x: 50,
    y: 50,
    price: 150,
    clothes_type_id: 1,
  },
];

export const MOCK_LOCATIONS = [
  {
    id: 1,
    name: "Челгу",
    description: "Такая лока крутая жесть ваще. А тут очень много разного текста нужно написать, чтоб посмотреть как будет обрезаться лишнее для слишком длинного текст, такого, как этот, например, или, может быть, любой другой настоящий или ненастоящий текст, текст-рыба, ну, в общем, вы поняли.",
    photo: "assets/location.png",
    price: 150,
  },
  {
    id: 2,
    name: "Челгу",
    description: "Такая лока крутая жесть ваще. А тут очень много разного текста нужно написать, чтоб посмотреть как будет обрезаться лишнее для слишком длинного текст, такого, как этот, например, или, может быть, любой другой настоящий или ненастоящий текст, текст-рыба, ну, в общем, вы поняли.",
    photo: "assets/ssl-warning.png",
    price: 150,
  },
  {
    id: 3,
    name: "Челгу",
    description: "Такая лока крутая жесть ваще. А тут очень много разного текста нужно написать, чтоб посмотреть как будет обрезаться лишнее для слишком длинного текст, такого, как этот, например, или, может быть, любой другой настоящий или ненастоящий текст, текст-рыба, ну, в общем, вы поняли.",
    photo: "assets/ssl-warning.png",
    price: 150,
  },
];

export const MOCK_CHARACTERS = [
  {
    id: 1,
    status: HapinessStatuses.Good,
    photo: 'assets/char_good.png'
  },
  {
    id: 2,
    status: HapinessStatuses.Bad,
    photo: 'assets/char_sad.png'
  },
  {
    id: 3,
    status: HapinessStatuses.Cool,
    photo: 'assets/char_happy.png'
  }
];
