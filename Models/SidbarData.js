import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  method: { type: String, enum: ['GET', 'POST', 'PUT', 'DELETE'], required: true }
});

const sidebarSchema = new mongoose.Schema({
  title: { type: String, required: true },
  items: [itemSchema]
});

const Sidebar = mongoose.model('SidebarData', sidebarSchema);

export default Sidebar;
