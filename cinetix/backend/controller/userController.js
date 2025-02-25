const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/UserSchema.js');



// Create a new user
const createUser = async (req, res) => {
	const { first_name, last_name, email, password, confirm_password } = req.body;

	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: 'Email already in use' });
		}
		if (confirm_password !== password) {
			return res.status(400).send({ message: "Passwords are not matched..." });
		}

		const requiredFields = { first_name, last_name, email, password };
		const missingFields = [];
		Object.keys(requiredFields).forEach((key) => {
			if (requiredFields[key] === undefined) {
				missingFields.push(key);
			}
		});

		if (missingFields.length !== 0) {
			return res.status(400).send({ message: `${missingFields} are required...` });
		}

		const user = new User({
			first_name,
			last_name,
			email,
			password,
		});

		await user.save();
		res.status(201).json({ message: 'User created successfully!' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Login user (new method)
 const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ message: 'Invalid email or password' });
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid email or password' });
		}

		const token = jwt.sign(
			{ userId: user._id, email: user.email, role: user.role },
			process.env.JWT_SECRET,
			{ expiresIn: '1d' }
		);

		res.json({ token, userName: `${user.first_name} ${user.last_name}`, role: user.role || "user" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Get all users
 const getAllUsers = async (req, res) => {
	try {
		const { page = 1, limit = 10 } = req.query;
		const skip = (page - 1) * limit;
		const users = await User.find().select('-password').skip(skip).limit(limit);
		const totalUsers = await User.countDocuments();

		res.status(200).send({ totalPages: Math.ceil(totalUsers / limit), currentPage: page, users });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Get a user by ID
 const getUser = async (req, res) => {
	try {
		const user = await User.findById(req.user?.userId).select('-password');
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.json(user);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Update a user
 const updateUser = async (req, res) => {
	const { first_name, last_name, email } = req.body;

	try {
		const updatedUser = await User.findByIdAndUpdate(
			req.user?.userId,
			{ first_name, last_name, email },
			{ new: true }
		).select('-password');
		if (!updatedUser) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.json(updatedUser);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

// UPDATE USER PASSWORD
 const updatePassword = async (req, res) => {
	const { newPassword } = req.body;

	try {
		const user = await User.findById(req.user?.userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		user.password = newPassword;
		await user.save();

		res.json({ message: "Password updated successfully" });
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

// Delete a user
 const deleteUser = async (req, res) => {
	try {
		const deletedUser = await User.findByIdAndDelete(req.params.id);
		if (!deletedUser) {
			return res.status(404).json({ message: 'User not found' });
		}
		await Analytics.findOneAndDelete({ user: req.params.id });
		res.json({ message: 'User deleted successfully' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

 const googleCallback = async (req, res) => {
	try {
		if (!req.user) {
			return res.status(400).send({ error: "Authentication failed. No user found." });
		}

		const user = req.user;
		const token = jwt.sign(
			{ userId: user._id, email: user.email },
			process.env.JWT_SECRET,
			{ expiresIn: '1d' }
		);

		const userName = `${user.first_name} ${user.last_name}`;


		res.redirect(`${process.env.FRONTEND_URL}?token=${token}&userName=${userName}`);
	} catch (error) {
		console.error("Error in googleCallback:", error);
		res.status(500).send({ error: "Internal server error..." });
	}
};


module.exports = { createUser, loginUser, getAllUsers, getUser, googleCallback }
