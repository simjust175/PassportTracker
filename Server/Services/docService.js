import Doc from "../Database/Models/Documents.js";
const keys = (body, deet)=> {
    let key = ""
    if(typeof body[deet] === 'string' && body[deet] !== null){
       key = `= "${body[deet]}"`
    } else if(body[deet] === null){
        key = "IS NULL"
    } else {
        key = `= ${body[deet]}`
    }
    return  `${deet} ${key}`
}

class DocService {
    static async postService(body, {token}) {
        const [{user_id}] = await Doc.ValidateByToken(token);
        console.log(token);
        const duplicate = `AND ${Object.keys(body).map(deet => keys(body, deet)).join(' AND ')}`;
        const isDuplicate = await Doc.GetDocs(user_id, duplicate)
        console.log("isDuplicate", isDuplicate.length);
        if(isDuplicate.length > 0) throw new Error("Document already exists")
        console.log("not duplicate");
        body.user = user_id
        try {
            const postDoc = await Doc.postDoc(body);
            if (!postDoc) return null;
            return postDoc;
        } catch (error) {
            throw new Error(`in Services/postService: ${error.message}`);
        }
    }

    static async getService({token}) {
        const [{user_id}] = await Doc.ValidateByToken(token);
        if (!user_id) throw new Error("not the correct user");
        try {
            const getDocs = await Doc.GetDocs(user_id);
            if (!getDocs) return null;
            return getDocs;
        } catch (error) {
            throw new Error(`error in DocService/getService: ${error.message}`);
        }
    }

    static async getTodaysService({date}) {
        try {
            const getDocs = await Doc.GetTodaysDocs(date);
            if (!getDocs) return null;
            return getDocs;
        } catch (error) {
            throw new Error(`error in DocService/getService: ${error.message}`);
        }
    }
}

export default DocService;
