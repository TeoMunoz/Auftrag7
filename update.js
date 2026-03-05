function update(msg, model) {

  if ("name" in msg) return { ...model, name: msg.name };

  if ("lat" in msg) return { ...model, lat: msg.lat };

  if ("lon" in msg) return { ...model, lon: msg.lon };

  if (msg.add && model.name && model.lat && model.lon) {

    return {
      ...model,
      locations: [
        ...model.locations,
        {
          name: model.name,
          lat: model.lat,
          lon: model.lon,
          weather: null
        }
      ],
      name: "",
      lat: "",
      lon: ""
    };
  }

  if ("del" in msg) {
    return {
      ...model,
      locations: model.locations.filter((_, i) => i !== msg.del)
    };
  }

  if ("weather" in msg) {
    const locations = model.locations.map((l, i) =>
      i === msg.index ? { ...l, weather: msg.weather } : l
    );

    return { ...model, locations };
  }

  return model;
}

module.exports = update;