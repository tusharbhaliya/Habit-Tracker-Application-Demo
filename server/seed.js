const mongoose = require('mongoose');
const Task = require('./models/task')
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/taskApp');

}
const seedDB = async () => {
    await Task.deleteMany({});
    await Task.insertMany([
        {
            name:"Do Spanish Video",
            date:1721070210861,
            completed:false,
            project:"School"
        },
        {
            name:"Math Worksheet 3.2",
            date:1721070210861,
            completed:false,
            project:"School"
        },
        {
            name:"History Project 2",
            date:1721070210861,
            completed:false,
            project:"School"
        },
        {
            name:"Cook Dinner",
            date:1721070210861,
            completed:false,
            project:"Personal"
        }
    ]);
}

seedDB().then(() => {
    mongoose.connection.close();
})