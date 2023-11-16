//const clientID = "SBX_001300";
//const clientSecret = await fs.readFileSync("values.txt", "utf-8").trim();

const { v4: uuidv4 } = require('uuid');
const { format } = require('date-fns');

const uuid = uuidv4();
const now = new Date();
const timestamp = format(now, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");




