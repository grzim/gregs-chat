import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import Chat from "../src/components/chat/Chat";
import { chatHistoryUrl, getUserIdUrl } from "../config";
import { settingsKeyLS } from "../src/utils/constants";
import { generateMessages } from "./messages-data";
import { pipe } from "../src/utils/helpers";
const { Response } = jest.requireActual("node-fetch");

const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      /Warning.*not wrapped in act/.test(args[0]) ||
      /Warning.*Can't perform a React state /.test(args[0]) ||
      /fetch unsuccessful/.test(args[0])
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

describe("when Chat component is rendered", () => {
  let socketAPIMock;
  beforeEach(() => {
    socketAPIMock = {
      send: jest.fn(),
      onMessageReceived: jest.fn(),
      onUserAliasUpdate: jest.fn(),
    };
  });
  it("request for userId is sent", () => {
    window.fetch = jest.fn();
    render(<Chat socketAPI={socketAPIMock} />);
    expect(window.fetch).toHaveBeenCalledWith(getUserIdUrl(), {
      method: "POST",
    });
  });
  it("settings from local storage are retrieved", () => {
    const spy = jest
      .spyOn(Storage.prototype, "getItem")
      .mockImplementation(() => "{}");
    render(<Chat socketAPI={socketAPIMock} />);
    expect(spy).toHaveBeenCalledWith(settingsKeyLS);
  });
  it("request for messages history is sent", () => {
    window.fetch = jest.fn();
    render(<Chat socketAPI={socketAPIMock} />);
    expect(window.fetch).toHaveBeenCalledWith(chatHistoryUrl);
  });
  it("settings window is closed", () => {
    const { container } = render(<Chat socketAPI={socketAPIMock} />);
    const settingsContainerQuery = ".settings-container";
    const settingsWindow = container.querySelector(settingsContainerQuery);
    expect(settingsWindow).toBeNull();
  });
});

describe("when message history or userId fetching fails", () => {
  it("information about error is displayed on the screen", () => {
    window.fetch = () => new Promise((resolve, reject) => reject());
    const errorMessage = screen.findByText("Server error");
    expect(errorMessage).toBeDefined();
  });
});

xdescribe("when send button is pressed", () => {
  it("it produces message that is not yet in sync with a server", () => {});
  it("it adds message to all messages", () => {});
  it("it sends message via socket", () => {});
  it("input is cleared", () => {});
  it("nothing happens if the input string is empty", () => {});
});

xdescribe("when message history is retrieved from a server", () => {
  let numberOfMessages, messagesContainer, socketAPIMock;
  beforeEach(() => {
    numberOfMessages = 2;
    window.fetch = () =>
      pipe(
        generateMessages,
        JSON.stringify,
        (json) => new Response(json)
      )(numberOfMessages);
    socketAPIMock = {
      send: jest.fn(),
      onMessageReceived: (setter) => setter(generateMessages(numberOfMessages)),
    };
  });
  it("messages are displayed in the screen", () => {});
  it("messages container is scrolled down to show latest message", () => {});
  it("users messages are displayed on the right side", () => {});
});

xdescribe("when a message is displayed on a screen", () => {
  it("its width is not bigger than the width of a screen", () => {});
  it("it renders images if correct urls provided", () => {});
  it("it displays url when it is not an image url", () => {});
});
xdescribe("when socket captures the event about new message receipt", () => {
  it("it adds message to all messages if it is a message from another user", () => {});
  it("it set message sync status to true if a user is an author of it", () => {});
});

xdescribe("when user changes their name", () => {
  it("all previous messages are adjusted to display changed name", () => {});
  it("all next messages will display changed name", () => {});
  it("socket message is emitted in order to inform the server it should change the name on the server", () => {});
});

xdescribe("when a notification about the change of another user name is received", () => {
  it("all previous messages are adjusted to display changed name", () => {});
  it("all next messages will display changed name", () => {});
});

xdescribe("when settings button is pressed, settings modal is opened", () => {});
xdescribe("when reset to default settings button is pressed", () => {
  it("settings are reset to default", () => {});
  it("default settings are saved in local storage", () => {});
});
xdescribe("when 24h option is set", () => {
  it("it is saved to local storage", () => {});
  it("it changes displayed time to 24h mode", () => {});
});
xdescribe("when Send messages on Ctrl/Cmd+Enter is set to 'on'", () => {
  it("it is saved to local storage", () => {});
  it("it enables to send message on Ctrl/Cmd+Enter", () => {});
});
xdescribe("when Send messages on Ctrl/Cmd+Enter is set to 'off'", () => {
  it("it is saved to local storage", () => {});
  it("it disables possibility to send message on Ctrl/Cmd+Enter", () => {});
});
