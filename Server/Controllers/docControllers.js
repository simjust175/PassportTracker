import DocService from "../Services/docService.js";

class DocControllers {
    static async postDoc({ body, params }, res) {
        if (!body) return res.status(400).json({ msg: 'Error in DocServices/postDocService' });
        try {
            const newDoc = await DocService.postService(body, params);
            if (!newDoc) return res.status(404).json({ msg: 'Error in DocServices/postDocService()' });
            res.status(200).json({ Success: `New Doc added successfully`, newDoc });
        } catch (error) {
            res.status(500).json({ Error: error.message });
        }
    }

    static async getDoc({ body }, res) {
        if (!body) return res.status(400).json({ msg: 'Error in Docervices/getDocervice' });
        try {
            const doc = await DocService.getService(body);
            if (!doc) return res.status(404).json({ msg: 'Error in DocServices/getDocService' });
            res.status(200).json({ Success: `Doc retrieved successfully`, doc });
        } catch (error) {
            res.status(500).json({ Error: `Error in DocServices/getAmount: ${error.message}` });
        }
    }
    static async getTodaysDoc({ params }, res) {
        if (!params) return res.status(400).json({ msg: 'Error in Docservices/getTodaysDocService' });
        try {
            const todaysDocs = await DocService.getTodaysService(params);
            if (!todaysDocs) return res.status(404).json({ msg: 'Error in TodaysDocSServices/getTodaysDocSService' });
            res.status(200).json({ Success: `TodaysDocS retrieved successfully`, todaysDocs });
        } catch (error) {
            res.status(500).json({ Error: `Error in TodaysDocSServices/getAmount: ${error.message}` });
        }
    }
}

export default DocControllers;
