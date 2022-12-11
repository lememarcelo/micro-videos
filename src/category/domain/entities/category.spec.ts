import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";
import { omit } from "lodash";
import { Category } from "./category";

describe("Category test", () => {
  test("Constructor of category", () => {
    let category = new Category({ name: "Movie" });

    let props = omit(category.props, "created_at");

    expect(props).toStrictEqual({
      name: "Movie",
      description: null,
      is_active: true,
    });

    expect(category.props.created_at).toBeInstanceOf(Date);

    let created_at = new Date();
    category = new Category({
      name: "Gladiador",
      description: "Filme epico",
      is_active: false,
      created_at,
    });

    expect(category.props).toStrictEqual({
      name: "Gladiador",
      description: "Filme epico",
      is_active: false,
      created_at,
    });

    category = new Category({
      name: "Vingadores",
      description: "Filme acao",
    });

    expect(category.props).toMatchObject({
      name: "Vingadores",
      description: "Filme acao",
    });

    category = new Category({
      name: "Vingadores",
      description: "Filme acao",
    });

    expect(category.props).toMatchObject({
      name: "Vingadores",
      description: "Filme acao",
    });

    created_at = new Date();
    category = new Category({
      name: "Vingadores",
      created_at,
    });

    expect(category.props).toMatchObject({
      name: "Vingadores",
      created_at,
    });
  });

  test("Getter of name prop", () => {
    let category = new Category({ name: "Movie" });
    expect(category.name).toBe("Movie");
  });

  test("Getter and Setter of descripition prop", () => {
    let category = new Category({ name: "Movie" });
    expect(category.description).toBeNull();

    category = new Category({
      name: "Movie",
      description: "Movie description",
    });
    expect(category.description).toBe("Movie description");

    category = new Category({ name: "Movie" });
    category["description"] = "Other description";
    expect(category.description).toBe("Other description");

    category = new Category({ name: "Movie" });
    category["description"] = undefined;
    expect(category.description).toBeNull();

    category = new Category({ name: "Movie" });
    category["description"] = null;
    expect(category.description).toBeNull();
  });

  test("Getter and setter of is_active prop", () => {
    let category = new Category({ name: "Movie" });
    expect(category.is_active).toBeTruthy();

    category = new Category({ name: "Movie", is_active: true });
    expect(category.is_active).toBeTruthy();

    category = new Category({ name: "Movie", is_active: false });
    expect(category.is_active).toBeFalsy();

    category["is_active"] = undefined;
    expect(category.is_active).toBeTruthy();

    category["is_active"] = true;
    expect(category.is_active).toBeTruthy();

    category["is_active"] = false;
    expect(category.is_active).toBeFalsy();

    category["is_active"] = null;
    expect(category.is_active).toBeTruthy();
  });

  test("Getter of created_at prop", () => {
    let category = new Category({ name: "Movie" });
    expect(category.created_at).toBeInstanceOf(Date);

    let created_at = new Date();
    category = new Category({ name: "Movie", created_at });
    expect(category.created_at).toBe(created_at);
  });

  test("ID Prop", () => {
    const data = [
      { props: { name: "Movie" } },
      { props: { name: "Movie" }, id: null },
      { props: { name: "Movie" }, id: undefined },
      { props: { name: "Movie" }, id: new UniqueEntityId() },
    ];

    data.forEach((I) => {
      const category = new Category(I.props, I.id as any);
      expect(category.id).not.toBeNull();
      expect(category.id).toBeInstanceOf(UniqueEntityId);
    });
  });
});
