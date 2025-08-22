const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
	name: { 
		type: String, 
		required: [true, 'Name is required'],
		trim: true,
		minlength: [2, 'Name must be at least 2 characters'],
		maxlength: [50, 'Name cannot exceed 50 characters']
	},
	email: { 
		type: String, 
		required: [true, 'Email is required'], 
		unique: true,
		trim: true,
		lowercase: true,
		match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
	},
	password: { 
		type: String, 
		required: [true, 'Password is required'],
		minlength: [6, 'Password must be at least 6 characters']
	},
	role: {
		type: String,
		enum: {
			values: ['user', 'admin', 'superAdmin'],
			message: 'Role must be user, admin, or superAdmin'
		},
		default: 'user'
	},
	isBlocked: {
		type: Boolean,
		default: false
	},
	blockedAt: {
		type: Date,
		default: null
	},
	blockedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		default: null
	},
	createdAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

// Instance method to check password
UserSchema.methods.matchPassword = async function (entered) {
	return await bcrypt.compare(entered, this.password);
};

// Instance method to check if user has admin privileges
UserSchema.methods.isAdmin = function() {
	return this.role === 'admin' || this.role === 'superAdmin';
};

// Instance method to check if user is super admin
UserSchema.methods.isSuperAdmin = function() {
	return this.role === 'superAdmin';
};

// Instance method to check if user can manage another user
UserSchema.methods.canManageUser = function(targetUserRole) {
	if (this.role === 'superAdmin') return true;
	if (this.role === 'admin' && targetUserRole === 'user') return true;
	return false;
};

// Instance method to block user
UserSchema.methods.blockUser = function(blockedByUserId) {
	this.isBlocked = true;
	this.blockedAt = new Date();
	this.blockedBy = blockedByUserId;
};

// Instance method to unblock user
UserSchema.methods.unblockUser = function() {
	this.isBlocked = false;
	this.blockedAt = null;
	this.blockedBy = null;
};

// Indexes for performance
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ isBlocked: 1 });
UserSchema.index({ createdAt: -1 });

module.exports = mongoose.model('User', UserSchema);
