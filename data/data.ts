import { faker } from "@faker-js/faker";
import moment from "moment";
import fs from "fs";
import path from "path";

moment.locale("en-gb");

class Data {
  today = moment().format("L");

  getUnixTimeStamp() {
    let number = moment().unix();
    let num = number.toString();
    return num;
  }
  save_user(username: string, firstname: string) {
    const user = { username: username, firstname: firstname };
    const filePath = path.join(__dirname, "registeredUser.json");
    fs.writeFileSync(filePath, JSON.stringify(user, null, 2));
  }

  save_token(token: string) {
    const loginToken = { token: token };
    const filePath = path.join(__dirname, "loginToken.json");
    fs.writeFileSync(filePath, JSON.stringify(loginToken, null, 2));
  }
  public firstName = faker.person.firstName();
  public lastName = faker.person.lastName();
  public uniqueUsername = this.firstName + this.lastName + this.getUnixTimeStamp();
  public password = "Test12345!@";
  public standardUser = "StefanVQA";

  public invalid = {
    existingUsername: "Test",
    longUsername: "TestQTestQTestQTestQTestQTestQTestQTestQTestQTestQTestQ",
    lowercasePassword: "test12345!",
    uppercasePassword: "TEST12345!",
    nosymbolPassword: "Test12345",
    nonumberPassword: "testTEST",
    shortPassword: "Test1",
    longPassword: "Test1!Test1!Test1!Test1!Test1!Test1!Test1!Test1!Test1!",
  };

  API_URL = "https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com";
}

export default new Data();
