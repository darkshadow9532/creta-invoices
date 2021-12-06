// default status - statusText :
// 1 - Mới lên đơn
// 2 - Đã soạn hàng
// 3 - Đã đóng hàng
// 4 - Đã giao hàng
// 5 - Khách đã nhận

module.exports = (mongoose) => {
    var schema = mongoose.Schema(
      {
        invoiceCode: {
          type: String,
          unique: true
        },
        crDeliveryStatus: Number,
        crDeliveryStatusText: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
    
    const DeliveryStatus = mongoose.model("deliveryStatus", schema);
    return DeliveryStatus;
  };