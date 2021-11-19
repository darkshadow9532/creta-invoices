module.exports = (mongoose, mongoosePaginate) => {
    var schema = mongoose.Schema(
      {
        name: String,
        numberList: Array
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
    
    schema.plugin(mongoosePaginate);
    
    const NumberList = mongoose.model("numberList", schema);
    return NumberList;
  };