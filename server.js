const express = require('express'),
    bodyParser = require('body-parser'),
    Sequelize = require('sequelize'),
    app = express();

app.use(bodyParser.json());

const sequelize = new Sequelize('proiect-tw', 'root', 'root', {
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

app.get('/create', async (req, res) => {
    try {
        await sequelize.sync({ force: true })
        res.status(201).json({ message: 'created' })
    }
    catch (e) {
        console.warn(e)
        res.status(500).json({ message: 'server error' })
    }
})

const User = sequelize.define('user', {
    lastname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [3, 30]
        }
    },
    firstname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [3, 30]
        }
    },
    sex: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isIn: [
                ['F', 'M']
            ]
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [3, 30]
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [3, 30]
        }
    }
})

const Location = sequelize.define('location', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [3, 45]
        }
    }
});

const LocationStep = sequelize.define('location_step', {
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    observations: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            len: [10, 400]
        }
    },
    rating: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
            isNumeric: true,
            max: 5,
            min: 1
        }
    }
});

const Step = sequelize.define('step', {
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    observations: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            len: [10, 400]
        }
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [3, 45]
        }
    }
})

const Plan = sequelize.define('plan', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [3, 45]
        }
    },
    observations: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            len: [10, 400]
        }
    },
    rating: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
            isNumeric: true,
            max: 5,
            min: 1
        }
    }
});

Location.hasMany(LocationStep);
Plan.hasMany(Step);
Plan.hasMany(LocationStep);
User.hasMany(Plan);

app.listen(8080);

app.get('/user', async (req, res) => {
    try {
        let user = await User.find({
            where: {
                password: req.query.password,
                username: req.query.username
            }
        })
        if (user) {
            res.status(200).json(user)
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (e) {
        console.warn(e.stack)
        res.status(500).json({ message: 'server error' })
    }
})

app.post('/user', async (req, res) => {
    try {
        await User.create(req.body)
        res.status(201).json({ message: 'created' })
    }
    catch (e) {
        console.warn(e)
        res.status(500).json({ message: 'server error' })
    }
})

app.get('/locations', async (req, res) => {
    try {
        let locations = await Location.findAll();
        res.status(200).json(locations)
    }
    catch (e) {
        console.warn(e)
        res.status(500).json({ message: 'server error' })
    }
})

app.get('/plans/:userId', async (req, res) => {
    try {
        let plans = await Plan.findAll({
            where: {
                userId: req.params.userId
            },
            include: ['steps', 'location_steps']
        })
        if (plans) {
            res.status(200).json(plans)
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    } catch (e) {
        console.warn(e.stack)
        res.status(500).json({ message: 'server error' })
    }
})

app.post('/plans', async (req, res) => {
    try {
        await Plan.create(req.body)
        res.status(201).json({ message: 'created' })
    }
    catch (e) {
        console.warn(e)
        res.status(500).json({ message: 'server error' })
    }
})

app.put('/plans/:id', async (req, res) => {
    try {
        let plan = await Plan.findById(req.params.id)
        if (plan) {
            await plan.update(req.body)
            res.status(202).json({ message: 'accepted' })
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    }
    catch (e) {
        console.warn(e)
        res.status(500).json({ message: 'server error' })
    }
})

app.post('/plans/:id/steps', async (req, res) => {
    try {
        if (req.query.bulk && req.query.bulk == 'on') {
            await Step.bulkCreate(req.body)
            res.status(201).json({ message: 'created' })
        }
        else {
            await Step.create(req.body)
            res.status(201).json({ message: 'created' })
        }
    }
    catch (e) {
        console.warn(e)
        res.status(500).json({ message: 'server error' })
    }
})

app.put('/plans/:id/steps/:stepId', async (req, res) => {
    try {
        let plan = await Plan.findById(req.params.id)
        if (plan) {
            let step = await Step.findById(req.params.stepId)
            if(step) {
                await step.update(req.body)
                res.status(202).json({ message: 'accepted' })
            } else {
                res.status(404).json({ message: 'not found' })
            }
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    }
    catch (e) {
        console.warn(e)
        res.status(500).json({ message: 'server error' })
    }
})

app.put('/plans/:id/location_steps/:stepId', async (req, res) => {
    try {
        let plan = await Plan.findById(req.params.id)
        if (plan) {
            let locationStep = await LocationStep.findById(req.params.stepId)
            if(locationStep) {
                await locationStep.update(req.body)
                res.status(202).json({ message: 'accepted' })
            } else {
                res.status(404).json({ message: 'not found' })
            }
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    }
    catch (e) {
        console.warn(e)
        res.status(500).json({ message: 'server error' })
    }
})

app.post('/plans/:id/location_steps', async (req, res) => {
    try {
        if (req.query.bulk && req.query.bulk == 'on') {
            await LocationStep.bulkCreate(req.body)
            res.status(201).json({ message: 'created' })
        }
        else {
            await LocationStep.create(req.body)
            res.status(201).json({ message: 'created' })
        }
    }
    catch (e) {
        console.warn(e)
        res.status(500).json({ message: 'server error' })
    }
})

app.delete('/plans/:id', async (req, res) => {
    try {
        let plan = await Plan.findById(req.params.id)
        if (plan) {
            await plan.destroy()
            res.status(202).json({ message: 'accepted' })
        }
        else {
            res.status(404).json({ message: 'not found' })
        }
    }
    catch (e) {
        console.warn(e)
        res.status(500).json({ message: 'server error' })
    }
})