"use server"
import bcrypt from "bcrypt";




export async function SaveSecurely(text) {
  const saltRounds = 10;
 const hash = await bcrypt.hash(text, saltRounds);

  return hash ;
}
export async function CheckSecurely(hash, text) {
return bcrypt.compare(text, hash)

  
}
