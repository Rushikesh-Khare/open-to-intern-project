const college = require('../model/collegeModel');
const intern = require('../model/internModel');

const createCollege = async function (req, res) {
    try {
        const data = req.body;
        if (!data) {
            return res.status(400).send({ status: false, msg: 'body should not be empty' });
        }

        if (!data.name) {
            return res.status(400).send({ status: false, msg: 'please provide college name' });
        }

        if (!data.fullName) {
            return res.status(400).send({ status: false, msg: 'please provide college full name' });
        }

        if (!data.logoLink) {
            return res.status(400).send({ status: false, msg: 'please provide logo link' });
        }


        data['isDeleted'] = false;

        const create = await college.create(data);
        res.status(201).send({ status: true, data: create });
    } catch (error) {
        if (error.message.includes("validation")) {
            return res.status(400).send({ status: false, message: error.message })
        }
        res.status(500).send({ status: false, data: error.message });
    }

};

const createIntern = async function (req, res) {
    try {
        const data = req.body;
        if (!data.name) {
            return res.status(400).send({ status: false, msg: 'please provide name' });
        }
        if (!data.email) {
            return res.status(400).send({ status: false, msg: 'please provide email' });
        }
        const findEmailData = await intern.findOne({ email: data.email });
        if (findEmailData) {
            return res.status(400).send({ status: false, msg: 'email already existed' });
        }
        if (!data.mobile) {
            return res.status(400).send({ status: false, msg: 'please provide mobile number' });
        }
        const findMobileData = await intern.findOne({ mobile: data.mobile });
        if (findMobileData) {
            return res.status(400).send({ status: false, msg: 'mobile number is already existed' });
        }

        if (!data.collegeName) {
            return res.status(400).send({ status: false, msg: 'please provide college name' });
        }


        // find college id from college name

        const findCollegeId = await college.findOne({ name: data.collegeName });
        if (!findCollegeId) {
            return res.status(400).send({ status: false, msg: 'invalid college name' });
        }
       
        data['collegeId'] = findCollegeId._id;
        data['isDeleted'] = false;

        const createData = await intern.create(data);

        return res.status(201).send({ status: true, data: createData });

    } catch (error) {
        if (error.message.includes("validation")) {
            return res.status(400).send({ status: false, message: error.message })
        }
        res.status(500).send({ status: false, data: error.message });
    }


}

const collegeDetails = async function (req, res) {
    try {
        const collegeName = req.query.collegeName;
        const findData = await college.findOne({ name: collegeName }).select({ name: 1, fullName: 1, logoLink: 1 });
        if (!findData) {
            return res.status(400).send({ status: false, msg: 'invalid college name' });
        }
        const data = findData;
        const internData = await intern.find({ collegeId: findData._id });
        
        if (!internData) {
            return res.status(400).send({ status: false, msg: 'not found' });
        }
        data.interns = internData;

        return res.status(200).send({ status: true, data: { name: data.name, fullName: data.fullName, logoLink: data.logoLink, interns: internData } });

    } catch (error) {
        res.status(500).send({ status: false, data: error.message });
    }
}

module.exports = { createCollege, createIntern, collegeDetails };