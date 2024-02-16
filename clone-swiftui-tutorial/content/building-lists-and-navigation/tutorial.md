# !hero Building lists and navigation

This tutorial guides you through building _Landmarks_ — an app for discovering and sharing the places you love. You’ll start by building the view that shows a landmark’s details.

To lay out the views, Landmarks uses _stacks_ to combine and layer the image and text view components. To add a map to the view, you’ll include a standard MapKit component. As you refine the view’s design, Xcode provides real-time feedback so you can see how those changes translate into code.

Download the project files to begin building this project, and follow the steps below.

> !time 40mins
> !files https://v1.codehike.org
> !xcode https://v1.codehike.org

# !!sections Create a new project and explore the canvas

## !intro

![!cover A screenshot of the editor and canvas, with the iPhone preview showing to the right.](01010H.png)

Create a new Xcode project that uses SwiftUI. Explore the canvas, previews, and the SwiftUI template code.

To preview and interact with views from the canvas in Xcode, and to use all the latest features described throughout the tutorials, ensure your Mac is running macOS Sonoma or later.

## !! Step 1

Open Xcode and either click “Create New Project” in Xcode’s startup window, or choose File > New > Project.

![!screenshot A screenshot of the Xcode welcome screen. There are three options to choose from when you open Xcode: Create New Project, Clone Git Repository, and Open Existing Project. The first option is highlighted.](010101.png)

## !! Step 2

In the template selector, select iOS as the platform, select the App template, and then click Next.

![!screenshot A screenshot of the template selector sheet in Xcode. In the top row, iOS is selected as the platform. In the Application section, App is selected as the template. The Next button in the lower-right corner is highlighted.](010102.png)

## !! Step 3

Enter “Landmarks” as the product name, select “SwiftUI” for the interface and “Swift” for the language, and click Next. Choose a location to save the Landmarks project on your Mac.

![!screenshot A screenshot of the project sheet which shows the name Landmarks filled in for the Product Name. The interface is set to SwiftUI, and the language is set to Swift.](010103.png)

## !! Step 4

In the Project navigator, select `LandmarksApp`.

---

An app that uses the SwiftUI app life cycle has a structure that conforms to the `App` protocol. The structure’s `body` property returns one or more scenes, which in turn provide content for display. The `@main` attribute identifies the app’s entry point.

```swift ! LandmarksApp.swift
import SwiftUI

@main
struct LandmarksApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

## !! Step 5

In the Project navigator, select `ContentView`.

---

By default, SwiftUI view files declare a structure and a preview. The structure conforms to the `View` protocol and describes the view’s content and layout. The preview declaration creates a preview for that view.

![!preview A screenshot from the Xcode preview as it would appear on iPhone, with the image of a globe and the text, Hello, world, centered in the middle of the display.](010105.png)

```swift ! ContentView.swift
import SwiftUI

// !Mark(1:11)
struct ContentView: View {
    var body: some View {
        VStack {
            Image(systemName: "globe")
                .imageScale(.large)
                .foregroundStyle(.tint)
            Text("Hello, world!")
        }
        .padding()
    }
}

#Preview {
    ContentView()
}
```

## !! Step 6

The canvas displays a preview automatically.

---

If the canvas isn’t visible, select Editor > Canvas to show it.

![!screenshot A screenshot of the Xcode canvas showing an iPhone preview screen that has the text Hello world below a globe icon.](010106.png)

## !! Step 7

Inside the body property, remove everything but the Text declaration and change “Hello, world!” to a greeting for yourself.

---

As you change the code in a view’s body property, the preview updates to reflect your changes.

![!preview A screenshot from the Xcode preview as it would appear on iPhone, with the text, Hello SwiftUI!, centered in the middle of the display.](010107.png)

```swift ! ContentView.swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        // !Mark
        Text("Hello SwiftUI!")
    }
}

#Preview {
    ContentView()
}
```

# !!sections Customize the text view

## !intro

You can customize a view’s display by changing your code, or by using the inspector to discover what’s available and to help you write code.

As you build the Landmarks app, you can use any combination of editors: the source editor, the canvas, or the inspectors. Your code stays updated, regardless of which tool you use.

![!cover A screenshot of the editor and canvas, with the iPhone preview showing to the right.](01020H.png)

## /

Next, you’ll customize the text view using the inspector.

## !! Step 1

Change the canvas mode to Selectable.

---

The canvas displays previews in Live mode by default so that you can interact with them, but you can use the Selectable mode to enable editing instead.

![!screenshot A screenshot of the editor and canvas, with the iPhone preview showing to the right.](010201.png)

## !! Step 2

In the preview, Command-Control-click the greeting to bring up the structured editing popover, and choose “Show SwiftUI Inspector”.

---

The popover shows different attributes that you can customize, depending on the type of view you inspect.

![!screenshot A screenshot of the editor and canvas, with the iPhone preview showing to the right.](010202.png)

## !! Step 3

Use the inspector to change the text to “Turtle Rock”, the name of the first landmark you’ll show in your app.

![!screenshot A screenshot.](010203.png)

## !! Step 4

Change the Font modifier to “Title”.

---

This applies the system font to the text so that it responds correctly to the user’s preferred font sizes and settings.

![!screenshot A screenshot.](010204.png)

## /

To customize a SwiftUI view, you call methods called _modifiers_. Modifiers wrap a view to change its display or other properties. Each modifier returns a new view, so it’s common to chain multiple modifiers, stacked vertically.

## !! Step 5

Edit the code by hand to add the `foregroundColor(.green)` modifier; this changes the text’s color to green.

![!preview A screenshot.](010205.png)

```swift ! ContentView.swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        Text("Turtle Rock")
            .font(.title)
            // !Mark
            .foregroundColor(.green)
    }
}

#Preview {
    ContentView()
}
```

## /

Your code is always the source of truth for the view. When you use the inspector to change or remove a modifier, Xcode updates your code immediately to match.

## !! Step 6

This time, open the inspector by Control-clicking on the `Text` declaration in the code editor, and then choose “Show SwiftUI Inspector” from the popover. Click the Color pop-up menu and choose Inherited to change the text color to black again.

![!screenshot A screenshot.](010206.png)

## !! Step 7

Notice that Xcode updates your code automatically to reflect the change, removing the `foregroundColor(.green)` modifier.

![!preview A screenshot.](010207.png)

```swift ! ContentView.swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        Text("Turtle Rock")
            .font(.title)
            // !Mark

    }
}

#Preview {
    ContentView()
}
```

## !! Step 8

Set the preview back to Live mode.

---

Working in Live mode makes it easy to keep track of view behavior as you make edits in source.

![!screenshot A screenshot.](010208.png)

# !!sections Combine views using stacks

## !intro

Beyond the title view you created in the previous section, you’ll add text views to contain details about the landmark, such as the name of the park and state it’s in.

When creating a SwiftUI view, you describe its content, layout, and behavior in the view’s `body` property; however, the `body` property only returns a single view. You can combine and embed multiple views in _stacks_, which group views together horizontally, vertically, or back-to-front.

In this section, you’ll use a vertical stack to place the title above a horizontal stack that contains details about the park.

![!cover A screenshot of the editor and canvas, with the iPhone preview showing to the right.](01030H.png)

## /

You can use Xcode to embed a view in a container view, open an inspector, or help with other useful changes.

## !! Step 1

Control-click the text view’s initializer to show a context menu, and then choose “Embed in VStack”.

![!screenshot A screenshot.](010301.png)

## /

Next, you’ll add a text view to the stack by dragging a `Text` view from the library.

## !! Step 2

Open the library by clicking the plus button (+) at the top-right of the Xcode window, and then drag a `Text` view to the place in your code immediately below the “Turtle Rock” text view.

![!screenshot A screenshot.](010302.png)

## !! Step 3

Replace the `Text` view’s placeholder text with “Joshua Tree National Park”.

![!preview A screenshot.](010303.png)

```swift ! ContentView.swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack {
            Text("Turtle Rock")
                .font(.title)
            // !Mark
            Text("Joshua Tree National Park")
        }
    }
}

#Preview {
    ContentView()
}
```

## /

Customize the location to match the desired layout.

## !! Step 4

Set the location’s font to `subheadline`.

![!preview A screenshot.](010304.png)

```swift ! ContentView.swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack {
            Text("Turtle Rock")
                .font(.title)
            Text("Joshua Tree National Park")
                // !Mark
                .font(.subheadline)
        }
    }
}

#Preview {
    ContentView()
}
```

## !! Step 5

Edit the `VStack` initializer to align the views by their leading edges.

---

By default, stacks center their contents along their axis and provide context-appropriate spacing.

![!preview A screenshot.](010305.png)

```swift ! ContentView.swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        // !Mark
        VStack(alignment: .leading) {
            Text("Turtle Rock")
                .font(.title)
            Text("Joshua Tree National Park")
                .font(.subheadline)
        }
    }
}

#Preview {
    ContentView()
}
```

## /

Next, you’ll add another text view to the right of the location, this for the park’s state.

## !! Step 6

Embed the “Joshua Tree National Park” text view in an HStack.

![!preview A screenshot.](010305.png)

```swift ! ContentView.swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack(alignment: .leading) {
            Text("Turtle Rock")
                .font(.title)
            // !Mark(1:4)
            HStack {
                Text("Joshua Tree National Park")
                    .font(.subheadline)
            }
        }
    }
}

#Preview {
    ContentView()
}
```

## !! Step 7

Add a new text view after the location, change the placeholder text to the park’s state, and then set its font to `subheadline`.

![!preview A screenshot.](010307.png)

```swift ! ContentView.swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack(alignment: .leading) {
            Text("Turtle Rock")
                .font(.title)
            HStack {
                Text("Joshua Tree National Park")
                    .font(.subheadline)
                // !Mark(1:2)
                Text("California")
                    .font(.subheadline)
            }
        }
    }
}

#Preview {
    ContentView()
}
```

## !! Step 8

To direct the layout to use the full width of the device, separate the park and the state by adding a `Spacer` to the horizontal stack holding the two text views.

---

A _spacer_ expands to make its containing view use all of the space of its parent view, instead of having its size defined only by its contents.

![!preview A screenshot.](010308.png)

```swift ! ContentView.swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack(alignment: .leading) {
            Text("Turtle Rock")
                .font(.title)
            HStack {
                Text("Joshua Tree National Park")
                    .font(.subheadline)
                // !Mark
                Spacer()
                Text("California")
                    .font(.subheadline)
            }
        }
    }
}

#Preview {
    ContentView()
}
```

## !! Step 9

Finally, use the `padding()` modifier to give the landmark’s name and details a little more space around their outer edges.

![!preview A screenshot.](010309.png)

```swift ! ContentView.swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack(alignment: .leading) {
            Text("Turtle Rock")
                .font(.title)
            HStack {
                Text("Joshua Tree National Park")
                    .font(.subheadline)
                Spacer()
                Text("California")
                    .font(.subheadline)
            }
        }
        // !Mark
        .padding()
    }
}

#Preview {
    ContentView()
}
```

# !quiz Check Your Understanding

## !!questions

When creating a custom SwiftUI view, where do you declare the view’s layout?

### !!answers

In the view's initializer.

> !hint Use the body property to declare the view’s layout.

### !!answers correct

In the `body` property.

> !hint Custom views implement the body property, which is a requirement of the View protocol.

### !!answers

In the `layoutSubviews()` method.

> !hint SwiftUI views are not UIView subclasses. Use the body property to declare the view’s layout.

## !!questions

What is the purpose of a spacer in SwiftUI?

### !!answers

To add space between views.

> !hint Spacers expand to make their containing view use all of the space of its parent view.

### !!answers correct

To make a view use all of the space of its parent view.

> !hint Spacers expand to make their containing view use all of the space of its parent view.

### !!answers

To center a view within its parent view.

> !hint Spacers expand to make their containing view use all of the space of its parent view.
