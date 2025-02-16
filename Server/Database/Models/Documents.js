import db from "../config/db.js"
import joi from "joi"
//~ES5~ const db = require("db");
//~ES5~ const joi = require("joi");

const isNotDeleted = "deleted_at IS NULL";

class Doc{
    static async validateInfo(amount_data){
        const amountSchema = joi.object({
            amount: joi.number().required()
        });
        return amountSchema.validate(amount_data)
    };

    static async postDoc(body){
        console.log("IN MODELS:", body);
        const INSERT_doc = "INSERT INTO documents SET ?";
        const [docInserted, _] = await db.query(INSERT_doc, [body]);
        return docInserted;
    }

    static async ValidateByToken(token){
        const sql = "SELECT user_id FROM users WHERE token = ?";
        const [user_id, _] = await db.query(sql, [token]);
        return user_id;
    }

    static async GetDocs(user_id, optionalWhere){
        const SELECT_docs = `SELECT * FROM documents WHERE user = ? AND ${isNotDeleted} ${optionalWhere}`;
        console.log("sql code", SELECT_docs);
        const [docSelected, _] = await db.query(SELECT_docs, [user_id]);
        console.log('sql', docSelected);
        return docSelected;
    }

    static async GetTodaysDocs(date){
        const SELECT_docs = `SELECT user_name, user_email, type, date, country, state, six_months, reminder_period FROM documents INNER JOIN users ON documents.user = users.user_id WHERE documents.date = ?`;
        console.log("select today", SELECT_docs);
        console.log("sql code", SELECT_docs);
        const [docSelected, _] = await db.query(SELECT_docs, [date]);
        console.log('sql', docSelected);
        return docSelected;
    }
} 


//~ES5~ module.export = AmountModel
export default Doc;