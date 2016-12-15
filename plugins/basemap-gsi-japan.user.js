// ==UserScript==
// @id             iitc-plugin-basemap-gsi-japan
// @name           IITC plugin: GSI map tiles (Japan Only)
// @category       Map Tiles
// @version        0.2.1.@@DATETIMEVERSION@@
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @updateURL      none
// @downloadURL    none
// @description    [@@BUILDNAME@@-@@BUILDDATE@@] Add the Geospatial Information Authority of Japan map tiles as optional layers. Available only in Japan.
// @include        https://*.ingress.com/intel*
// @include        http://*.ingress.com/intel*
// @match          https://*.ingress.com/intel*
// @match          http://*.ingress.com/intel*
// @include        https://*.ingress.com/mission/*
// @include        http://*.ingress.com/mission/*
// @match          https://*.ingress.com/mission/*
// @match          http://*.ingress.com/mission/*
// @grant          none
// ==/UserScript==


@@PLUGINSTART@@

// PLUGIN START ////////////////////////////////////////////////////////

// Map data © 国土地理院 (The Geospatial Information Authority of Japan)
//
// The bathymetric contours are derived from those contained within the GEBCO
// Digital Atlas, published by the BODC on behalf of IOC and IHO (2003)
// (http://www.gebco.net)
//
// 海上保安庁許可第２２２５１０号（水路業務法第２５条に基づく類似刊行物）
//
// GSI's terms of use: http://www.gsi.go.jp/ENGLISH/page_e30286.html
//
// > The Terms of Use are compatible with the Creative Commons Attribution
// > License 4.0 (hereinafter referred to as the CC License). This means that
// > Content based on the Terms of Use may be used under the CC License in
// > lieu of the Terms of Use.

// use own namespace for plugin
window.plugin.mapTileGsiJapan = {
  addLayer: function() {

    // Register the GSI map tiles as base layers.

    var basicOptions = {
      attribution:  'Map data © <a href="http://www.gsi.go.jp/ENGLISH/index.html">国土地理院</a>',
      minZoom:      5,
      maxZoom:      21,
      detectRetina: true,
    };
    var layerAttributes = [
      { name: 'GSI of Japan (Standard)', directory: 'std',   maxNativeZoom: 18 },
      { name: 'GSI of Japan (Pale)',     directory: 'pale',  maxNativeZoom: 18 },
      { name: 'GSI of Japan (Blank)',    directory: 'blank', maxNativeZoom: 14 },
    ];

    layerAttributes.forEach(function (attr) {
      layerChooser.addBaseLayer(
        new L.TileLayer(
          'https://cyberjapandata.gsi.go.jp/xyz/' + attr.directory + '/{z}/{x}/{y}.png',
          $.extend(basicOptions, { maxNativeZoom: attr.maxNativeZoom })),
        attr.name
      );
    });
  },
};

var setup = window.plugin.mapTileGsiJapan.addLayer;

// PLUGIN END //////////////////////////////////////////////////////////

@@PLUGINEND@@
