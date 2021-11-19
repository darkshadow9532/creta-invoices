module.exports = (mongoose) => {
    var schema = mongoose.Schema(
      {
        invoiceCode: String,
        actionName: String,
        actionStatus: String,
        actionData: Object
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
    
    const Action = mongoose.model("action", schema);
    return Action;
  };