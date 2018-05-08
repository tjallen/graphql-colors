const v4 = require("uuid/v4");

const {
  GraphQLID,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLEnumType,
  GraphQLSchema
} = require("graphql");
const Colors = require("../data/Colors.js");

const ColorType = new GraphQLObjectType({
  name: "ColorType",
  description: "Color type",
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString }
  }
});

const ColorCreateType = new GraphQLInputObjectType({
  name: "ColorCreateType",
  type: ColorType,
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) }
  }
});

const ColorDeleteType = new GraphQLInputObjectType({
  name: "ColorDeleteType",
  type: ColorType,
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) }
  }
});

const ColorUpdateType = new GraphQLInputObjectType({
  name: "ColorUpdateType",
  type: ColorType,
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) }
  }
});

const ColorQueryType = new GraphQLObjectType({
  name: "ColorQueryType",
  description: "Color Query Schema",
  fields: {
    colors: {
      type: new GraphQLList(ColorType),
      resolve: () => Colors
    }
  }
});

const ColorMutationType = new GraphQLObjectType({
  name: "ColorMutationType",
  description: "Color Query Schema",
  fields: {
    createColor: {
      type: ColorType,
      args: {
        input: { type: new GraphQLNonNull(ColorCreateType) }
      },
      resolve: (source, { input }) => {
        const colorData = {};
        colorData.id = v4();
        colorData.name = input.name;
        Colors.push(colorData);
        return colorData;
      }
    },
    updateColor: {
      type: ColorType,
      args: {
        input: { type: new GraphQLNonNull(ColorUpdateType) }
      },
      resolve: (source, { input }) => {
        const colorData = {};
        colorData.id = input.id;
        colorData.name = input.name;

        const index = Colors.findIndex(c => c.id === input.id);
        const update = Colors.splice(index, 1, colorData);

        return colorData;
      }
    },
    deleteColor: {
      type: ColorType,
      args: {
        input: { type: new GraphQLNonNull(ColorDeleteType) }
      },
      resolve: (source, { input }) => {
        const index = Colors.findIndex(c => c.id === input.id);
        const update = Colors.splice(index, 1);
        return input;
      }
    }
  }
});

const ColorSchema = new GraphQLSchema({
  query: ColorQueryType,
  mutation: ColorMutationType
});

module.exports = ColorSchema;
