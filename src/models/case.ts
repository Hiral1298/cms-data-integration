import { getModelForClass, prop } from "@typegoose/typegoose";

class Case {
  @prop({ required: true })
  public bankName!: string;

  @prop({ required: true })
  public propertyName!: string;

  @prop({ required: true })
  public city!: string;

  @prop({ required: true })
  public borrowerName!: string;

  @prop({ required: true })
  public createdAt!: Date;
}

const CaseModel = getModelForClass(Case);
export default CaseModel;
