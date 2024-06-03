import { getModelForClass, prop } from "@typegoose/typegoose";

class Logger {
  @prop({ required: true })
  public type!: string;

  @prop({ required: true })
  public errorData!: string;

  @prop({ required: true })
  public createdAt!: Date;
}

const LoggerModel = getModelForClass(Logger);
export default LoggerModel;
