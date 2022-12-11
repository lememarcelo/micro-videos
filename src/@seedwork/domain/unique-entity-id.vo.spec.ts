import { validate as uuidValidate } from "uuid";
import InvalidUuidError from "../errors/invalid-uuid.error";
import UniqueEntityId from "./unique-entity-id.vo";

function spyValidateMethod() {
  return jest.spyOn(UniqueEntityId.prototype as any, "validate");
}

describe("UniqueEntityid Unit Test", () => {
  it("should throw error when uuid is invalid", () => {
    const validateSpy = spyValidateMethod();
    expect(() => new UniqueEntityId("Fake id")).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it("Should accept a uuid passed in constructor", () => {
    const validateSpy = spyValidateMethod();
    const uuid = "c6d058df-a5d9-4add-a03e-2065f0344074";
    let vo = new UniqueEntityId(uuid);
    expect(vo.id).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it("Should accept a uuid passed in constructor", () => {
    const validateSpy = spyValidateMethod();
    let vo = new UniqueEntityId();
    expect(uuidValidate(vo.id)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});
