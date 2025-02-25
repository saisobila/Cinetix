const User = require('../model/UserSchema.js');

const createDefaultAdmin = async () => {
	try {
		const existingAdmin = await User.findOne({ role: "admin" });
		if (existingAdmin) {
			console.log('Default admin already exists.');
			return;
		}

		// Create the admin
		const newAdmin = new User({
			first_name: "Admin",
			last_name: "User",
			email: 'dev@gmail.com',
			password: 'dev@123',
			role: "admin",
		});

		await newAdmin.save();
		console.log('Default admin created successfully.');
	} catch (error) {
		console.error('Error creating default admin:', error.message);
	}
};

module.exports = createDefaultAdmin;
