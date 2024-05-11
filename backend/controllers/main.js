const Count = require("../models/countSchema");
const Component = require("../models/main");

exports.create = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Please provide both title and content",
      });
    }

    const newComponent = new Component({ title, content });
    await newComponent.save();

    let count = await Count.findOne({});
    if (!count) {
      count = new Count({ addCount: 1 });
    } else {
      count.addCount++;
    }
    await count.save();

    res.status(200).json({
      success: true,
      message: "Component added successfully",
      component: newComponent,
      count,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const component = await Component.findByIdAndUpdate(
      id,
      { title, content },
      {
        new: true,
      }
    );

    let count = await Count.findOne({});
    if (!count) {
      count = new Count({ updateCount: 1 });
    } else {
      count.updateCount++;
    }
    await count.save();

    res.status(200).json({
      success: true,
      message: "Component updated successfully",
      component,
      count,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};
exports.count = async (req,res) => {
    try {
         let count = await Count.findOne({});
        if (count) {
              return  res.status(200).json({
                  success: true,                  
                  count,
                });       
        }
        else {
                     return res.status(200).json({
                       success: true,
                       count : 0,
                     });       

            
      }
  } catch (e) {
       res.status(500).json({
         success: false,
         message: "Internal server error",
         error: err.message,
       });
  }
};
