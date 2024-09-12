import { Router } from 'express';
import { FoodModel } from '../models/food.model.js';
import handler from 'express-async-handler';
import admin from '../middleware/admin.mid.js';

const router = Router();

//whenever we call for the route api of the food router it gives the foodmodel
//using handlerin every apis to make it all async

router.get(
  '/',
  handler(async (req, res) => {
    const foods = await FoodModel.find({});//return all foods
    res.send(foods);
  })
);

router.post(
  '/',
  admin,
  handler(async (req, res) => {
    const { name, price, tags, favorite, imageUrl, origins, cookTime } =
      req.body;

    const food = new FoodModel({
      name,
      price,
      tags: tags.split ? tags.split(',') : tags,
      favorite,
      imageUrl,
      origins: origins.split ? origins.split(',') : origins,
      cookTime,
    });

    await food.save();

    res.send(food);
  })
);

router.put(
  '/',
  admin,
  handler(async (req, res) => {
    const { id, name, price, tags, favorite, imageUrl, origins, cookTime } =
      req.body;

    await FoodModel.updateOne(
      { _id: id },
      {
        name,
        price,
        tags: tags.split ? tags.split(',') : tags,
        favorite,
        imageUrl,
        origins: origins.split ? origins.split(',') : origins,
        cookTime,
      }
    );

    res.send();
  })
);

router.delete(
  '/:foodId',
  admin,
  handler(async (req, res) => {
    const { foodId } = req.params;
    await FoodModel.deleteOne({ _id: foodId });
    res.send();
  })
);

//for getting all the tags
router.get(
  '/tags',
  handler(async (req, res) => {
    const tags = await FoodModel.aggregate([ //using aggregate func to run array of operators/function on mongoose model inside database
      {
        $unwind: '$tags',//makes sure every food have a single tag
      },
      {
        $group: {
          _id: '$tags',
          count: { $sum: 1 },//gives the no of food available on the specific tag
        },
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          count: '$count',
        },
      },
    ]).sort({ count: -1 });

    const all = {
      name: 'All',
      count: await FoodModel.countDocuments(),//counts all the foods present in the database
    };

    tags.unshift(all);//push adds items to end and unshift adds items to the beg of array

    res.send(tags);
  })
);

//search api to get foods when we search
router.get(
  '/search/:searchTerm',
  handler(async (req, res) => {
    const { searchTerm } = req.params;
    const searchRegex = new RegExp(searchTerm, 'i');

    const foods = await FoodModel.find({ name: { $regex: searchRegex } });
    res.send(foods);//send the food response we got after search
  })
);

//finds foods based on tags
router.get(
  '/tag/:tag',
  handler(async (req, res) => {
    const { tag } = req.params;
    const foods = await FoodModel.find({ tags: tag });
    res.send(foods);
  })
);

//connects all this to the frontend
router.get(
  '/:foodId',
  handler(async (req, res) => {
    const { foodId } = req.params;
    const food = await FoodModel.findById(foodId);
    res.send(food);
  })
);

export default router;
