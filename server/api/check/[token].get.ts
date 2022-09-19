import mongo from "~/server/utils/mongo";

export default defineEventHandler(async (event) => {
  const { token } = event.context.params;
  try {
    // this fails with error if db does not exist
    await mongo(token);
    setCookie(event, "mongouuid", token);
    return "ok";
  } catch (e) {
    throw new Error("Database does not exist");
  }
});
