const zod = require("zod"); // para validaciones

const movieSchema = zod.object({
  title: zod.string({
    invalid_type_error: "Title must be a string",
    required_error: "Title is required",
  }),
  year: zod.number().int().min(1900).max(2024),
  director: zod.string().min(3).max(50),
  duration: zod.number().int().positive(),
  poster: zod.string().url({
    message: "Poter must be a valid url",
  }),
  genre: zod.array(
    zod.enum([
      "Action",
      "Crime",
      "Drama",
      "Adventure",
      "Sci-Fi",
      "Romance",
      "Animation",
      "Biography",
      "Fantasy",
    ]),
    {
      required_error: "Genre is reuired",
      invalid_type_error: "Genre must be an array of enum Genre",
    }
  ),
  rate: zod.number().min(0).max(10).default(0),
});

function validateMovie(object) {
  // con safeParse verifico más facil si tiene un error o datos
  return movieSchema.safeParse(object);
}

module.exports = { validateMovie };
