import fs from "node:fs/promises";

const DB_PATH = new URL('../db.json', import.meta.url).pathname;

//Storing the contents of db into db variable and converting the JSON into object
export const getDB = async () => {
  const db = await fs.readFile(DB_PATH, "utf-8");
  return JSON.parse(db);
};


//Saving the or writing to the db
export const saveDB = async (db) => {

  // writing to the db=>converting from object to string , 2 adds indentation ,null==>replacer,
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
  return db;
};

//inserting into db
export const insert = async (data) => {

  //getting the file storing in db
  const db = await getDB();

  //pushing the data into the file
  db.notes.push(data);

  //watiting for to write to the db or saving content into the db
  await saveDB(db);
  return data;
};
