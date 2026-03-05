const hh = require("hyperscript-helpers");
const { h } = require("virtual-dom");

const { div, input, button, table, tr, td, th } = hh(h);

function view(dispatch, model) {

  return div([

    div([
      input({
        placeholder: "Location",
        value: model.name,
        oninput: e => dispatch({ name: e.target.value })
      }),

      input({
        placeholder: "Lat",
        value: model.lat,
        oninput: e => dispatch({ lat: e.target.value })
      }),

      input({
        placeholder: "Lon",
        value: model.lon,
        oninput: e => dispatch({ lon: e.target.value })
      }),

      button({
        onclick: () => dispatch({ add: true })
      }, "Add")
    ]),

    table([

      tr([
        th("Location"),
        th("Current"),
        th("Min"),
        th("Max"),
        th("")
      ]),

      ...model.locations.map((l, i) =>
        tr([
          td(l.name),
          td(l.weather ? l.weather.temp : "-"),
          td(l.weather ? l.weather.min : "-"),
          td(l.weather ? l.weather.max : "-"),
          td(button({
            onclick: () => dispatch({ del: i })
          }, "X"))
        ])
      )

    ])

  ]);
}

module.exports = view;