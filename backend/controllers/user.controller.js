const db = require("../models");
const User = db.User;
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;
const axios = require('axios');


exports.createUser = async(req, res) => {
	// Validate request
	if (!req.body.firstName || !req.body.lastName || !req.body.password || !req.body.phone_no || !req.body.email) {
		res.status(400).send({
			message: "All fields are required!"
		});
		return;
	}
	// Create a User
	const user= {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		password: req.body.password,
		phone_no: req.body.phoneNo,
		balance: 0,
		email: req.body.email
				};
	// Save User in the database (Managed Transaction)
	try {
		const result = await sequelize.transaction(async (t) => {
			const createdUser = await User.create(user, { transaction: t });
			return createdUser
		});
		res.status(201).json({ message: 'User created successfully', user: result });
		} catch (error) {
		console.error('Error creating user:', error);
		res.status(500).json({ error: 'Internal Server Error' });
		}
	};


exports.findUserByCondition = async(req, res) => {
	// Validate request
	if (!req.query.phoneNo || !req.query.email) {
		res.status(400).send({
		message: "Missing Phone Number or Email!"
		});
		return;
		}
	const phoneNo = req.query.phoneNo || 0;
	const email = req.query.email || " ";
	try{
		const user = await User.findAll({
			where: {
				[Op.or]: [{
					phoneNo: {
					[Op.eq]: phoneNo
					}
				}, {
					email: {
					[Op.eq]: email
					}
				}]
			}
		});
		if (user.length === 0) {
		res.status(404).json({ message: 'User not found', User:null });;
		} else {
		res.status(200).json({ message: 'User found', User:user });
		}
	}
	catch (error)
	{
		console.error('Error while finding user:', error);
		res.status(500).json({ error: 'Internal Server Error' });

	}
};


exports.updateUserBalance = async(req, res) => {
	// Validate request
	if (!req.body.user_id && !req.body.ampunt )
	{
		res.status(400).send({
		message: "Missing User ID and/or amount!"
		});
		return;
	}
	const  user_id = req.body.user_id;
	const amount = req.body.amount;
	const user = await User.findOne({ where: { user_id: user_id } });
	if (user)
		{
			try
				{
					const result = await sequelize.transaction(async (t) => {
					const updatedRows = await user.update({balance: user.balance + amount }, { transaction: t });
					return updatedRows
					});
					const url =  `localhost:3000/pages/api/webhooks/${user.user_id}`;
					res.status(201).json({ message: 'User created successfully', user: result });
					const data = {
						user: user_id,
						amount: amount,
					}
					const headers = {
						'Authorization': 'Bearer SECRET_API_KEY',
					  };

					axios
						.post(url, data, { headers })
						.then((response) => {
						console.log('POST request successful:', response.data);
						})
						.catch((error) => {
							console.error('Error making POST request:', error);
						});
				}
			catch (error)
				{
					console.error('Error creating user:', error);
					res.status(500).json({ error: 'Internal Server Error' });
				}
		}
	else
		{
			res.status(404).json({ error: 'User Not Found' })
		}
};

exports.deleteUser = async(req, res) => {
	// Validate request
	if (!req.params.userId) {
	  res.status(400).send({
		message: "Missing User ID!"
	  });
	  return;
	}

	const userId = req.params.userId;

	try {
	  const result = await sequelize.transaction(async (t) => {
		await User.destroy({
		  where: { id: userId },
		  transaction: t
		});
		return result;
	  });

	  res.status(200).json({ message: 'User deleted successfully', result });
	} catch (error) {
	  console.error('Error deleting user:', error);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  };
