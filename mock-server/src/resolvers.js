module.exports = {
  Query: {
    rating: async (parent, args, context, info) => {
      await new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
      return { value: 70 };
    }
  }
};
