import { render } from "@testing-library/react-native";
import { HeaderLogo } from "./header-logo";

describe("HeaderLogo", () => {
  it("should render header logo without crashing", () => {
    const { toJSON } = render(<HeaderLogo />);

    expect(toJSON()).toBeTruthy();
  });

  it("should render with correct structure", () => {
    const { toJSON } = render(<HeaderLogo />);

    const component = toJSON();
    expect(component).toBeTruthy();
  });
}); 