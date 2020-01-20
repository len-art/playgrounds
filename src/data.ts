const round = (n: number) => Math.round((n / 255) * 100) / 100;

const hexToRgb = (hex: string) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        round(parseInt(result[1], 16)),
        round(parseInt(result[2], 16)),
        round(parseInt(result[3], 16)),
        1.0
      ]
    : [0.0, 0.0, 0.0, 1.0];
};

const possessions: {
  [key: string]: {
    name: string;
    color: number[];
  };
} = {
  FIELD: {
    name: "Field",
    color: hexToRgb("#333333")
  },
  RANGER: {
    name: "Ranger",
    color: hexToRgb("#0C97FF")
  },
  RIDER: {
    name: "Rider",
    color: hexToRgb("#2cbe4e")
  },
  MRO: {
    name: "Skip",
    color: hexToRgb("#ff5555")
  }
};

interface Pin {
  [key: string]: any;
  vehicleId: number;
  blackboxId?: string;
  location: { lat: number; lng: number };
  possessionType: string;
  action: string;
}

export interface PinCluster {
  pins: Pin[];
  isSelected: boolean;
}

const pins: PinCluster[] = [
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.9086623,
          lng: -77.0026931
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 1,
        blackboxId: "b1",
        location: {
          lat: 38.89752,
          lng: -77.0035817
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 2,
        blackboxId: "b2",
        location: {
          lat: 38.9078983,
          lng: -77.00032
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 3,
        blackboxId: "b3",
        location: {
          lat: 38.8974333,
          lng: -77.0035104
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 4,
        blackboxId: "b4",
        location: {
          lat: 38.897735,
          lng: -77.0075409
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 5,
        blackboxId: "b5",
        location: {
          lat: 38.8960675,
          lng: -77.0202431
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 6,
        blackboxId: "b6",
        location: {
          lat: 38.9034192,
          lng: -76.9964451
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 7,
        blackboxId: "b7",
        location: {
          lat: 38.90786,
          lng: -77.0000117
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 8,
        blackboxId: "b8",
        location: {
          lat: 38.9023863,
          lng: -77.0214778
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 9,
        blackboxId: "b9",
        location: {
          lat: 38.9073667,
          lng: -77.0177717
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 10,
        blackboxId: "b10",
        location: {
          lat: 38.8922545,
          lng: -77.0221311
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 11,
        blackboxId: "b11",
        location: {
          lat: 38.90819,
          lng: -76.9971017
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 12,
        blackboxId: "b12",
        location: {
          lat: 38.9079917,
          lng: -77.0002517
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 13,
        blackboxId: "b13",
        location: {
          lat: 38.9079495,
          lng: -77.0103926
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 14,
        blackboxId: "b14",
        location: {
          lat: 38.8948237,
          lng: -77.0153647
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 15,
        blackboxId: "b15",
        location: {
          lat: 38.9137683,
          lng: -77.0160583
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 16,
        blackboxId: "b16",
        location: {
          lat: 38.902235,
          lng: -77.0199433
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 17,
        blackboxId: "b17",
        location: {
          lat: 38.9081767,
          lng: -76.9971167
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 18,
        blackboxId: "b18",
        location: {
          lat: 38.896834,
          lng: -77.0068985
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 19,
        blackboxId: "b19",
        location: {
          lat: 38.902795,
          lng: -77.0211517
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 20,
        blackboxId: "b20",
        location: {
          lat: 38.908037,
          lng: -77.0001657
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 21,
        blackboxId: "b21",
        location: {
          lat: 38.9088883,
          lng: -77.0229917
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 22,
        blackboxId: "b22",
        location: {
          lat: 38.8998373,
          lng: -77.0220838
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 23,
        blackboxId: "b23",
        location: {
          lat: 38.8922983,
          lng: -77.0222067
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 24,
        blackboxId: "b24",
        location: {
          lat: 38.892323,
          lng: -77.0220698
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 25,
        blackboxId: "b25",
        location: {
          lat: 38.8923133,
          lng: -77.0152683
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 26,
        blackboxId: "b26",
        location: {
          lat: 38.9164215,
          lng: -76.9823734
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 27,
        blackboxId: "b27",
        location: {
          lat: 38.9079968,
          lng: -77.0000867
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 28,
        blackboxId: "b28",
        location: {
          lat: 38.8974407,
          lng: -77.0034646
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 29,
        blackboxId: "b29",
        location: {
          lat: 38.9080152,
          lng: -77.0002657
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 30,
        blackboxId: "b30",
        location: {
          lat: 38.9079333,
          lng: -77.00034
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 31,
        blackboxId: "b31",
        location: {
          lat: 38.8922833,
          lng: -77.0221867
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 32,
        blackboxId: "b32",
        location: {
          lat: 38.8972296,
          lng: -77.0215339
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 33,
        blackboxId: "b33",
        location: {
          lat: 38.9003302,
          lng: -77.0016322
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 34,
        blackboxId: "b34",
        location: {
          lat: 38.892735,
          lng: -77.0138733
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 35,
        blackboxId: "b35",
        location: {
          lat: 38.8993138,
          lng: -76.9996888
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 36,
        blackboxId: "b36",
        location: {
          lat: 38.8975417,
          lng: -77.0034133
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 37,
        blackboxId: "b37",
        location: {
          lat: 38.8923367,
          lng: -77.0221683
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 38,
        blackboxId: "b38",
        location: {
          lat: 38.90259,
          lng: -77.019645
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 39,
        blackboxId: "b39",
        location: {
          lat: 38.9151656,
          lng: -76.9836259
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 40,
        blackboxId: "b40",
        location: {
          lat: 38.8923385,
          lng: -77.0222591
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 41,
        blackboxId: "b41",
        location: {
          lat: 38.90029,
          lng: -77.0125917
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 42,
        blackboxId: "b42",
        location: {
          lat: 38.9054967,
          lng: -77.0219417
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 43,
        blackboxId: "b43",
        location: {
          lat: 38.9080167,
          lng: -77.0015567
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 44,
        blackboxId: "b44",
        location: {
          lat: 38.9064066,
          lng: -76.987719
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 45,
        blackboxId: "b45",
        location: {
          lat: 38.8947083,
          lng: -77.0120183
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 46,
        blackboxId: "b46",
        location: {
          lat: 38.915505,
          lng: -77.0219433
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 47,
        blackboxId: "b47",
        location: {
          lat: 38.9081792,
          lng: -76.997107
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 48,
        blackboxId: "b48",
        location: {
          lat: 38.8972733,
          lng: -77.0215417
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 49,
        blackboxId: "b49",
        location: {
          lat: 38.9056882,
          lng: -77.004208
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 50,
        blackboxId: "b50",
        location: {
          lat: 38.9165983,
          lng: -77.012115
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 51,
        blackboxId: "b51",
        location: {
          lat: 38.8995989,
          lng: -76.9996038
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 52,
        blackboxId: "b52",
        location: {
          lat: 38.907905,
          lng: -77.0001183
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 53,
        blackboxId: "b53",
        location: {
          lat: 38.9097101,
          lng: -77.014205
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 54,
        blackboxId: "b54",
        location: {
          lat: 38.8949665,
          lng: -77.0219411
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 55,
        blackboxId: "b55",
        location: {
          lat: 38.8970567,
          lng: -77.0114533
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 56,
        blackboxId: "b56",
        location: {
          lat: 38.895705,
          lng: -77.02221
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 57,
        blackboxId: "b57",
        location: {
          lat: 38.894941,
          lng: -77.0207216
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 58,
        blackboxId: "b58",
        location: {
          lat: 38.8999703,
          lng: -77.0055953
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 59,
        blackboxId: "b59",
        location: {
          lat: 38.8960567,
          lng: -76.984865
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 60,
        blackboxId: "b60",
        location: {
          lat: 38.9058263,
          lng: -77.0176218
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 61,
        blackboxId: "b61",
        location: {
          lat: 38.9079619,
          lng: -77.0002298
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 62,
        blackboxId: "b62",
        location: {
          lat: 38.89386,
          lng: -77.0118973
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 63,
        blackboxId: "b63",
        location: {
          lat: 38.9081633,
          lng: -76.9971
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 64,
        blackboxId: "b64",
        location: {
          lat: 38.8998779,
          lng: -77.0205244
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 65,
        blackboxId: "b65",
        location: {
          lat: 38.8947933,
          lng: -77.000455
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 66,
        blackboxId: "b66",
        location: {
          lat: 38.8952117,
          lng: -77.0112433
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 67,
        blackboxId: "b67",
        location: {
          lat: 38.8957617,
          lng: -77.0219833
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 68,
        blackboxId: "b68",
        location: {
          lat: 38.8922398,
          lng: -77.0154362
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 69,
        blackboxId: "b69",
        location: {
          lat: 38.8994701,
          lng: -77.021797
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 70,
        blackboxId: "b70",
        location: {
          lat: 38.9004683,
          lng: -77.001765
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 71,
        blackboxId: "b71",
        location: {
          lat: 38.9080305,
          lng: -77.0000683
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 72,
        blackboxId: "b72",
        location: {
          lat: 38.9097933,
          lng: -77.0229567
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 73,
        blackboxId: "b73",
        location: {
          lat: 38.917855,
          lng: -77.0232683
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 74,
        blackboxId: "b74",
        location: {
          lat: 38.8973618,
          lng: -77.0232877
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 75,
        blackboxId: "b75",
        location: {
          lat: 38.896225,
          lng: -77.0150733
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 76,
        blackboxId: "b76",
        location: {
          lat: 38.9080001,
          lng: -77.0002431
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 77,
        blackboxId: "b77",
        location: {
          lat: 38.9155215,
          lng: -77.0217786
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 78,
        blackboxId: "b78",
        location: {
          lat: 38.9050301,
          lng: -77.0220533
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 79,
        blackboxId: "b79",
        location: {
          lat: 38.8999193,
          lng: -77.020171
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 80,
        blackboxId: "b80",
        location: {
          lat: 38.8974883,
          lng: -77.0135606
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 81,
        blackboxId: "b81",
        location: {
          lat: 38.9042267,
          lng: -77.00074
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 82,
        blackboxId: "b82",
        location: {
          lat: 38.8997601,
          lng: -77.0214137
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 83,
        blackboxId: "b83",
        location: {
          lat: 38.9002823,
          lng: -77.0219747
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 84,
        blackboxId: "b84",
        location: {
          lat: 38.8948524,
          lng: -77.0154025
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 85,
        blackboxId: "b85",
        location: {
          lat: 38.9003942,
          lng: -77.0016837
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 86,
        blackboxId: "b86",
        location: {
          lat: 38.8948183,
          lng: -77.0152817
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 87,
        blackboxId: "b87",
        location: {
          lat: 38.900605,
          lng: -77.0021083
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 88,
        blackboxId: "b88",
        location: {
          lat: 38.8987967,
          lng: -77.0218017
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 89,
        blackboxId: "b89",
        location: {
          lat: 38.8984583,
          lng: -77.0200842
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 90,
        blackboxId: "b90",
        location: {
          lat: 38.9080533,
          lng: -76.99714
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 91,
        blackboxId: "b91",
        location: {
          lat: 38.9104433,
          lng: -77.0109483
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 92,
        blackboxId: "b92",
        location: {
          lat: 38.896311,
          lng: -77.0217653
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 93,
        blackboxId: "b93",
        location: {
          lat: 38.9097784,
          lng: -77.0152853
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 94,
        blackboxId: "b94",
        location: {
          lat: 38.8988457,
          lng: -77.0197653
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 95,
        blackboxId: "b95",
        location: {
          lat: 38.902635,
          lng: -77.0196167
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 96,
        blackboxId: "b96",
        location: {
          lat: 38.8957189,
          lng: -77.0219876
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 97,
        blackboxId: "b97",
        location: {
          lat: 38.8949533,
          lng: -77.0220118
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 98,
        blackboxId: "b98",
        location: {
          lat: 38.8998611,
          lng: -77.0209842
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 99,
        blackboxId: "b99",
        location: {
          lat: 38.9080017,
          lng: -77.0003433
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 100,
        blackboxId: "b100",
        location: {
          lat: 38.9155417,
          lng: -77.0221033
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 101,
        blackboxId: "b101",
        location: {
          lat: 38.9036483,
          lng: -77.0190183
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 102,
        blackboxId: "b102",
        location: {
          lat: 38.9084899,
          lng: -77.022037
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 103,
        blackboxId: "b103",
        location: {
          lat: 38.9079033,
          lng: -77.0000967
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 104,
        blackboxId: "b104",
        location: {
          lat: 38.8986933,
          lng: -77.0230533
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 105,
        blackboxId: "b105",
        location: {
          lat: 38.9088879,
          lng: -76.983349
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 106,
        blackboxId: "b106",
        location: {
          lat: 38.8986036,
          lng: -77.0213968
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 107,
        blackboxId: "b107",
        location: {
          lat: 38.9009079,
          lng: -76.9969208
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 108,
        blackboxId: "b108",
        location: {
          lat: 38.9033891,
          lng: -76.9995415
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 109,
        blackboxId: "b109",
        location: {
          lat: 38.9002826,
          lng: -76.9984765
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 110,
        blackboxId: "b110",
        location: {
          lat: 38.9163567,
          lng: -77.0083433
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 111,
        blackboxId: "b111",
        location: {
          lat: 38.9080263,
          lng: -77.0000959
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 112,
        blackboxId: "b112",
        location: {
          lat: 38.9119044,
          lng: -77.0179793
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 113,
        blackboxId: "b113",
        location: {
          lat: 38.9086417,
          lng: -77.02303
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 114,
        blackboxId: "b114",
        location: {
          lat: 38.9119921,
          lng: -77.0144048
        },
        possessionType: "FIELD",
        action: "CHARGE"
      },
      {
        vehicleId: 115,
        blackboxId: "b115",
        location: {
          lat: 38.8997797,
          lng: -76.9860463
        },
        possessionType: "FIELD",
        action: "CHARGEANDRETURN"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.8876203,
          lng: -77.0333732
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 1,
        blackboxId: "b1",
        location: {
          lat: 38.9032494,
          lng: -77.0242503
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 2,
        blackboxId: "b2",
        location: {
          lat: 38.8862171,
          lng: -77.0197585
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 3,
        blackboxId: "b3",
        location: {
          lat: 38.8986709,
          lng: -77.0396066
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 4,
        blackboxId: "b4",
        location: {
          lat: 38.9022144,
          lng: -77.0438138
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 5,
        blackboxId: "b5",
        location: {
          lat: 38.8937341,
          lng: -77.0433217
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 6,
        blackboxId: "b6",
        location: {
          lat: 38.8923817,
          lng: -77.023845
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 7,
        blackboxId: "b7",
        location: {
          lat: 38.9030149,
          lng: -77.0242184
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 8,
        blackboxId: "b8",
        location: {
          lat: 38.8922383,
          lng: -77.03965
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 9,
        blackboxId: "b9",
        location: {
          lat: 38.8919334,
          lng: -77.0153127
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 10,
        blackboxId: "b10",
        location: {
          lat: 38.898365,
          lng: -77.027766
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 11,
        blackboxId: "b11",
        location: {
          lat: 38.9007867,
          lng: -77.0467183
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 12,
        blackboxId: "b12",
        location: {
          lat: 38.8922967,
          lng: -77.0396583
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 13,
        blackboxId: "b13",
        location: {
          lat: 38.9011285,
          lng: -77.0256265
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 14,
        blackboxId: "b14",
        location: {
          lat: 38.8982467,
          lng: -77.0465667
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 15,
        blackboxId: "b15",
        location: {
          lat: 38.9014476,
          lng: -77.0435394
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 16,
        blackboxId: "b16",
        location: {
          lat: 38.8847916,
          lng: -77.0233116
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 17,
        blackboxId: "b17",
        location: {
          lat: 38.8934967,
          lng: -77.0420733
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 18,
        blackboxId: "b18",
        location: {
          lat: 38.88477,
          lng: -77.01511
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 19,
        blackboxId: "b19",
        location: {
          lat: 38.9012632,
          lng: -77.0258635
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 20,
        blackboxId: "b20",
        location: {
          lat: 38.9031601,
          lng: -77.036465
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 21,
        blackboxId: "b21",
        location: {
          lat: 38.8961383,
          lng: -77.0449683
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 22,
        blackboxId: "b22",
        location: {
          lat: 38.8957989,
          lng: -77.0268179
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 23,
        blackboxId: "b23",
        location: {
          lat: 38.8986562,
          lng: -77.0269869
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 24,
        blackboxId: "b24",
        location: {
          lat: 38.9031496,
          lng: -77.0241012
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 25,
        blackboxId: "b25",
        location: {
          lat: 38.8922517,
          lng: -77.0435233
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 26,
        blackboxId: "b26",
        location: {
          lat: 38.892013,
          lng: -77.0469831
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 27,
        blackboxId: "b27",
        location: {
          lat: 38.901425,
          lng: -77.0434117
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 28,
        blackboxId: "b28",
        location: {
          lat: 38.9029231,
          lng: -77.0416559
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 29,
        blackboxId: "b29",
        location: {
          lat: 38.8983567,
          lng: -77.0316083
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 30,
        blackboxId: "b30",
        location: {
          lat: 38.899627,
          lng: -77.0467381
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 31,
        blackboxId: "b31",
        location: {
          lat: 38.8950235,
          lng: -77.0275522
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 32,
        blackboxId: "b32",
        location: {
          lat: 38.8947083,
          lng: -77.026215
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 33,
        blackboxId: "b33",
        location: {
          lat: 38.896005,
          lng: -77.0337833
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 34,
        blackboxId: "b34",
        location: {
          lat: 38.896345,
          lng: -77.0331817
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 35,
        blackboxId: "b35",
        location: {
          lat: 38.8921883,
          lng: -77.0238583
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 36,
        blackboxId: "b36",
        location: {
          lat: 38.8922433,
          lng: -77.039665
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 37,
        blackboxId: "b37",
        location: {
          lat: 38.8996433,
          lng: -77.0468067
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 38,
        blackboxId: "b38",
        location: {
          lat: 38.9014086,
          lng: -77.0434541
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 39,
        blackboxId: "b39",
        location: {
          lat: 38.9023891,
          lng: -77.0436366
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 40,
        blackboxId: "b40",
        location: {
          lat: 38.892205,
          lng: -77.0411517
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 41,
        blackboxId: "b41",
        location: {
          lat: 38.8969004,
          lng: -77.0337126
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 42,
        blackboxId: "b42",
        location: {
          lat: 38.8991799,
          lng: -77.0240476
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 43,
        blackboxId: "b43",
        location: {
          lat: 38.8875983,
          lng: -77.0333861
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 44,
        blackboxId: "b44",
        location: {
          lat: 38.8996317,
          lng: -77.0467067
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 45,
        blackboxId: "b45",
        location: {
          lat: 38.8967283,
          lng: -77.0329333
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 46,
        blackboxId: "b46",
        location: {
          lat: 38.89614,
          lng: -77.02394
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 47,
        blackboxId: "b47",
        location: {
          lat: 38.9004067,
          lng: -77.0395867
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 48,
        blackboxId: "b48",
        location: {
          lat: 38.8973836,
          lng: -77.0476745
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 49,
        blackboxId: "b49",
        location: {
          lat: 38.8941583,
          lng: -77.0335933
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 50,
        blackboxId: "b50",
        location: {
          lat: 38.9015559,
          lng: -77.0317377
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 51,
        blackboxId: "b51",
        location: {
          lat: 38.8921683,
          lng: -77.04123
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 52,
        blackboxId: "b52",
        location: {
          lat: 38.8982611,
          lng: -77.0465207
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 53,
        blackboxId: "b53",
        location: {
          lat: 38.9032449,
          lng: -77.0363499
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 54,
        blackboxId: "b54",
        location: {
          lat: 38.9036283,
          lng: -77.0381817
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 55,
        blackboxId: "b55",
        location: {
          lat: 38.8964157,
          lng: -77.0326613
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 56,
        blackboxId: "b56",
        location: {
          lat: 38.9009467,
          lng: -77.0392417
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 57,
        blackboxId: "b57",
        location: {
          lat: 38.882876,
          lng: -77.0256229
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 58,
        blackboxId: "b58",
        location: {
          lat: 38.898195,
          lng: -77.023775
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 59,
        blackboxId: "b59",
        location: {
          lat: 38.8923233,
          lng: -77.037985
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 60,
        blackboxId: "b60",
        location: {
          lat: 38.8985417,
          lng: -77.0330433
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 61,
        blackboxId: "b61",
        location: {
          lat: 38.8994336,
          lng: -77.0453622
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 62,
        blackboxId: "b62",
        location: {
          lat: 38.8838751,
          lng: -77.0303417
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 63,
        blackboxId: "b63",
        location: {
          lat: 38.8990411,
          lng: -77.025737
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 64,
        blackboxId: "b64",
        location: {
          lat: 38.892185,
          lng: -77.04114
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 65,
        blackboxId: "b65",
        location: {
          lat: 38.8924609,
          lng: -77.02391
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 66,
        blackboxId: "b66",
        location: {
          lat: 38.90035,
          lng: -77.0399317
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 67,
        blackboxId: "b67",
        location: {
          lat: 38.8898367,
          lng: -77.017495
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 68,
        blackboxId: "b68",
        location: {
          lat: 38.8859233,
          lng: -77.0192251
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 69,
        blackboxId: "b69",
        location: {
          lat: 38.9002383,
          lng: -77.0400467
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 70,
        blackboxId: "b70",
        location: {
          lat: 38.89656,
          lng: -77.0333217
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 71,
        blackboxId: "b71",
        location: {
          lat: 38.8978324,
          lng: -77.0305243
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 72,
        blackboxId: "b72",
        location: {
          lat: 38.903765,
          lng: -77.0329533
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 73,
        blackboxId: "b73",
        location: {
          lat: 38.8814513,
          lng: -77.0188441
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 74,
        blackboxId: "b74",
        location: {
          lat: 38.89905,
          lng: -77.0279333
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 75,
        blackboxId: "b75",
        location: {
          lat: 38.900525,
          lng: -77.043975
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 76,
        blackboxId: "b76",
        location: {
          lat: 38.8960883,
          lng: -77.0449533
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 77,
        blackboxId: "b77",
        location: {
          lat: 38.8867217,
          lng: -77.03762
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 78,
        blackboxId: "b78",
        location: {
          lat: 38.8923683,
          lng: -77.0238133
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 79,
        blackboxId: "b79",
        location: {
          lat: 38.9014694,
          lng: -77.0432394
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 80,
        blackboxId: "b80",
        location: {
          lat: 38.8842919,
          lng: -77.0293196
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 81,
        blackboxId: "b81",
        location: {
          lat: 38.8982572,
          lng: -77.0465085
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 82,
        blackboxId: "b82",
        location: {
          lat: 38.9013,
          lng: -77.0418307
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 83,
        blackboxId: "b83",
        location: {
          lat: 38.903545,
          lng: -77.0249733
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 84,
        blackboxId: "b84",
        location: {
          lat: 38.90237,
          lng: -77.0464683
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 85,
        blackboxId: "b85",
        location: {
          lat: 38.8982117,
          lng: -77.046615
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 86,
        blackboxId: "b86",
        location: {
          lat: 38.8950444,
          lng: -77.0271474
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 87,
        blackboxId: "b87",
        location: {
          lat: 38.8957952,
          lng: -77.0266084
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 88,
        blackboxId: "b88",
        location: {
          lat: 38.891965,
          lng: -77.04047
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 89,
        blackboxId: "b89",
        location: {
          lat: 38.8959141,
          lng: -77.0251383
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 90,
        blackboxId: "b90",
        location: {
          lat: 38.8974726,
          lng: -77.0319208
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 91,
        blackboxId: "b91",
        location: {
          lat: 38.88943,
          lng: -77.020105
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 92,
        blackboxId: "b92",
        location: {
          lat: 38.8946767,
          lng: -77.0261433
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 93,
        blackboxId: "b93",
        location: {
          lat: 38.8980942,
          lng: -77.0268963
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 94,
        blackboxId: "b94",
        location: {
          lat: 38.8961233,
          lng: -77.0449667
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 95,
        blackboxId: "b95",
        location: {
          lat: 38.8998631,
          lng: -77.0421069
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 96,
        blackboxId: "b96",
        location: {
          lat: 38.9022567,
          lng: -77.04351
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 97,
        blackboxId: "b97",
        location: {
          lat: 38.9003618,
          lng: -77.0347082
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 98,
        blackboxId: "b98",
        location: {
          lat: 38.8879795,
          lng: -77.0183206
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 99,
        blackboxId: "b99",
        location: {
          lat: 38.8921383,
          lng: -77.0396633
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 100,
        blackboxId: "b100",
        location: {
          lat: 38.8962017,
          lng: -77.044935
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 101,
        blackboxId: "b101",
        location: {
          lat: 38.9008821,
          lng: -77.0342126
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 102,
        blackboxId: "b102",
        location: {
          lat: 38.8876162,
          lng: -77.0200569
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 103,
        blackboxId: "b103",
        location: {
          lat: 38.895635,
          lng: -77.0266356
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 104,
        blackboxId: "b104",
        location: {
          lat: 38.902555,
          lng: -77.0396518
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 105,
        blackboxId: "b105",
        location: {
          lat: 38.9007317,
          lng: -77.04519
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 106,
        blackboxId: "b106",
        location: {
          lat: 38.8858317,
          lng: -77.028025
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 107,
        blackboxId: "b107",
        location: {
          lat: 38.9024167,
          lng: -77.039625
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 108,
        blackboxId: "b108",
        location: {
          lat: 38.9016787,
          lng: -77.0258015
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 109,
        blackboxId: "b109",
        location: {
          lat: 38.8956585,
          lng: -77.0321882
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 110,
        blackboxId: "b110",
        location: {
          lat: 38.8946715,
          lng: -77.0262575
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 111,
        blackboxId: "b111",
        location: {
          lat: 38.9014333,
          lng: -77.0434367
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 112,
        blackboxId: "b112",
        location: {
          lat: 38.9011725,
          lng: -77.0419016
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 113,
        blackboxId: "b113",
        location: {
          lat: 38.8922783,
          lng: -77.023695
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 114,
        blackboxId: "b114",
        location: {
          lat: 38.8974267,
          lng: -77.0467183
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 115,
        blackboxId: "b115",
        location: {
          lat: 38.89241,
          lng: -77.0237933
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 116,
        blackboxId: "b116",
        location: {
          lat: 38.8978496,
          lng: -77.0401483
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 117,
        blackboxId: "b117",
        location: {
          lat: 38.9014498,
          lng: -77.0349761
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 118,
        blackboxId: "b118",
        location: {
          lat: 38.8998722,
          lng: -77.0315919
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 119,
        blackboxId: "b119",
        location: {
          lat: 38.8980281,
          lng: -77.0305095
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 120,
        blackboxId: "b120",
        location: {
          lat: 38.8922083,
          lng: -77.043555
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 121,
        blackboxId: "b121",
        location: {
          lat: 38.8925304,
          lng: -77.0290098
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 122,
        blackboxId: "b122",
        location: {
          lat: 38.8897866,
          lng: -77.0463216
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 123,
        blackboxId: "b123",
        location: {
          lat: 38.8959883,
          lng: -77.0414017
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 124,
        blackboxId: "b124",
        location: {
          lat: 38.88671,
          lng: -77.02135
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 125,
        blackboxId: "b125",
        location: {
          lat: 38.8921467,
          lng: -77.023835
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 126,
        blackboxId: "b126",
        location: {
          lat: 38.8962133,
          lng: -77.0459833
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 127,
        blackboxId: "b127",
        location: {
          lat: 38.89381,
          lng: -77.03933
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 128,
        blackboxId: "b128",
        location: {
          lat: 38.8923683,
          lng: -77.0238483
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 129,
        blackboxId: "b129",
        location: {
          lat: 38.8961817,
          lng: -77.0269533
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 130,
        blackboxId: "b130",
        location: {
          lat: 38.884115,
          lng: -77.0293
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 131,
        blackboxId: "b131",
        location: {
          lat: 38.9014183,
          lng: -77.0270133
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 132,
        blackboxId: "b132",
        location: {
          lat: 38.9032423,
          lng: -77.0274063
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 133,
        blackboxId: "b133",
        location: {
          lat: 38.9003617,
          lng: -77.034965
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 134,
        blackboxId: "b134",
        location: {
          lat: 38.901625,
          lng: -77.040785
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 135,
        blackboxId: "b135",
        location: {
          lat: 38.9025569,
          lng: -77.0466667
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 136,
        blackboxId: "b136",
        location: {
          lat: 38.8922475,
          lng: -77.0436277
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 137,
        blackboxId: "b137",
        location: {
          lat: 38.8962896,
          lng: -77.0275343
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 138,
        blackboxId: "b138",
        location: {
          lat: 38.8788601,
          lng: -77.0143602
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 139,
        blackboxId: "b139",
        location: {
          lat: 38.9026186,
          lng: -77.0332182
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 140,
        blackboxId: "b140",
        location: {
          lat: 38.8999811,
          lng: -77.0363764
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 141,
        blackboxId: "b141",
        location: {
          lat: 38.901403,
          lng: -77.0255463
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 142,
        blackboxId: "b142",
        location: {
          lat: 38.8965883,
          lng: -77.025935
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 143,
        blackboxId: "b143",
        location: {
          lat: 38.9006833,
          lng: -77.0467067
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 144,
        blackboxId: "b144",
        location: {
          lat: 38.8922233,
          lng: -77.037965
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 145,
        blackboxId: "b145",
        location: {
          lat: 38.8914,
          lng: -77.0392917
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 146,
        blackboxId: "b146",
        location: {
          lat: 38.8963683,
          lng: -77.0283617
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 147,
        blackboxId: "b147",
        location: {
          lat: 38.8923217,
          lng: -77.0437367
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 148,
        blackboxId: "b148",
        location: {
          lat: 38.885855,
          lng: -77.0280333
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 149,
        blackboxId: "b149",
        location: {
          lat: 38.9010358,
          lng: -77.0240335
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 150,
        blackboxId: "b150",
        location: {
          lat: 38.9025492,
          lng: -77.0329474
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 151,
        blackboxId: "b151",
        location: {
          lat: 38.9012858,
          lng: -77.0349273
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 152,
        blackboxId: "b152",
        location: {
          lat: 38.8919267,
          lng: -77.043615
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 153,
        blackboxId: "b153",
        location: {
          lat: 38.898204,
          lng: -77.027004
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 154,
        blackboxId: "b154",
        location: {
          lat: 38.8963267,
          lng: -77.028455
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 155,
        blackboxId: "b155",
        location: {
          lat: 38.9009308,
          lng: -77.0256063
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 156,
        blackboxId: "b156",
        location: {
          lat: 38.9026233,
          lng: -77.0240867
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 157,
        blackboxId: "b157",
        location: {
          lat: 38.8928747,
          lng: -77.0426572
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 158,
        blackboxId: "b158",
        location: {
          lat: 38.8974818,
          lng: -77.0271037
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 159,
        blackboxId: "b159",
        location: {
          lat: 38.8981214,
          lng: -77.0318311
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 160,
        blackboxId: "b160",
        location: {
          lat: 38.9038367,
          lng: -77.0320783
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 161,
        blackboxId: "b161",
        location: {
          lat: 38.8930367,
          lng: -77.0422733
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 162,
        blackboxId: "b162",
        location: {
          lat: 38.900785,
          lng: -77.0468426
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 163,
        blackboxId: "b163",
        location: {
          lat: 38.8995917,
          lng: -77.04685
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 164,
        blackboxId: "b164",
        location: {
          lat: 38.901375,
          lng: -77.04349
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 165,
        blackboxId: "b165",
        location: {
          lat: 38.89136,
          lng: -77.0392867
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 166,
        blackboxId: "b166",
        location: {
          lat: 38.9009783,
          lng: -77.0243483
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 167,
        blackboxId: "b167",
        location: {
          lat: 38.8976725,
          lng: -77.033941
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 168,
        blackboxId: "b168",
        location: {
          lat: 38.88762,
          lng: -77.0333883
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 169,
        blackboxId: "b169",
        location: {
          lat: 38.898017,
          lng: -77.051695
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 170,
        blackboxId: "b170",
        location: {
          lat: 38.8924282,
          lng: -77.0486844
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 171,
        blackboxId: "b171",
        location: {
          lat: 38.8984183,
          lng: -77.048985
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 172,
        blackboxId: "b172",
        location: {
          lat: 38.9008583,
          lng: -77.050075
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 173,
        blackboxId: "b173",
        location: {
          lat: 38.8983117,
          lng: -77.050175
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 174,
        blackboxId: "b174",
        location: {
          lat: 38.8984567,
          lng: -77.0488833
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 175,
        blackboxId: "b175",
        location: {
          lat: 38.9035884,
          lng: -77.0512432
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 176,
        blackboxId: "b176",
        location: {
          lat: 38.8981617,
          lng: -77.0502283
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 177,
        blackboxId: "b177",
        location: {
          lat: 38.900635,
          lng: -77.0517467
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 178,
        blackboxId: "b178",
        location: {
          lat: 38.8983951,
          lng: -77.0502825
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 179,
        blackboxId: "b179",
        location: {
          lat: 38.9037011,
          lng: -77.049875
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 180,
        blackboxId: "b180",
        location: {
          lat: 38.9005585,
          lng: -77.0488441
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 181,
        blackboxId: "b181",
        location: {
          lat: 38.8901069,
          lng: -77.0527053
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 182,
        blackboxId: "b182",
        location: {
          lat: 38.8985602,
          lng: -77.0493653
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 183,
        blackboxId: "b183",
        location: {
          lat: 38.898323,
          lng: -77.0517457
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 184,
        blackboxId: "b184",
        location: {
          lat: 38.898565,
          lng: -77.0491167
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 185,
        blackboxId: "b185",
        location: {
          lat: 38.9007233,
          lng: -77.0532033
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 186,
        blackboxId: "b186",
        location: {
          lat: 38.9038449,
          lng: -77.0499837
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 187,
        blackboxId: "b187",
        location: {
          lat: 38.8983717,
          lng: -77.04894
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 188,
        blackboxId: "b188",
        location: {
          lat: 38.90388,
          lng: -77.0534
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 189,
        blackboxId: "b189",
        location: {
          lat: 38.8980443,
          lng: -77.051468
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 190,
        blackboxId: "b190",
        location: {
          lat: 38.900816,
          lng: -77.0516952
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 191,
        blackboxId: "b191",
        location: {
          lat: 38.8982783,
          lng: -77.0502167
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 192,
        blackboxId: "b192",
        location: {
          lat: 38.9020117,
          lng: -77.051205
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 193,
        blackboxId: "b193",
        location: {
          lat: 38.8897277,
          lng: -77.048687
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 194,
        blackboxId: "b194",
        location: {
          lat: 38.90083,
          lng: -77.0502517
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 195,
        blackboxId: "b195",
        location: {
          lat: 38.8982164,
          lng: -77.0501848
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 196,
        blackboxId: "b196",
        location: {
          lat: 38.8984467,
          lng: -77.0489467
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 197,
        blackboxId: "b197",
        location: {
          lat: 38.9038131,
          lng: -77.0497612
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 198,
        blackboxId: "b198",
        location: {
          lat: 38.9007077,
          lng: -77.0532378
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 199,
        blackboxId: "b199",
        location: {
          lat: 38.8934449,
          lng: -77.0494567
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 200,
        blackboxId: "b200",
        location: {
          lat: 38.8997283,
          lng: -77.0530067
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 201,
        blackboxId: "b201",
        location: {
          lat: 38.8984447,
          lng: -77.0488924
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 202,
        blackboxId: "b202",
        location: {
          lat: 38.903545,
          lng: -77.0514481
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 203,
        blackboxId: "b203",
        location: {
          lat: 38.9036259,
          lng: -77.0497684
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 204,
        blackboxId: "b204",
        location: {
          lat: 38.9039783,
          lng: -77.0532567
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 205,
        blackboxId: "b205",
        location: {
          lat: 38.9039567,
          lng: -77.05332
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 206,
        blackboxId: "b206",
        location: {
          lat: 38.9008157,
          lng: -77.0489406
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 207,
        blackboxId: "b207",
        location: {
          lat: 38.9007567,
          lng: -77.05327
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 208,
        blackboxId: "b208",
        location: {
          lat: 38.9034921,
          lng: -77.0499203
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 209,
        blackboxId: "b209",
        location: {
          lat: 38.9036717,
          lng: -77.0499133
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 210,
        blackboxId: "b210",
        location: {
          lat: 38.8919433,
          lng: -77.0498233
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 211,
        blackboxId: "b211",
        location: {
          lat: 38.8893667,
          lng: -77.0497067
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 212,
        blackboxId: "b212",
        location: {
          lat: 38.9006824,
          lng: -77.0501304
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 213,
        blackboxId: "b213",
        location: {
          lat: 38.896085,
          lng: -77.0543633
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 214,
        blackboxId: "b214",
        location: {
          lat: 38.9009,
          lng: -77.049835
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 215,
        blackboxId: "b215",
        location: {
          lat: 38.903675,
          lng: -77.0500067
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 216,
        blackboxId: "b216",
        location: {
          lat: 38.898324,
          lng: -77.0489481
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 217,
        blackboxId: "b217",
        location: {
          lat: 38.8982667,
          lng: -77.0487669
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 218,
        blackboxId: "b218",
        location: {
          lat: 38.8787913,
          lng: -77.0230335
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 219,
        blackboxId: "b219",
        location: {
          lat: 38.8771617,
          lng: -77.017545
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 220,
        blackboxId: "b220",
        location: {
          lat: 38.8814811,
          lng: -77.0267575
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 221,
        blackboxId: "b221",
        location: {
          lat: 38.8764296,
          lng: -77.014815
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 222,
        blackboxId: "b222",
        location: {
          lat: 38.8813211,
          lng: -77.0278708
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 223,
        blackboxId: "b223",
        location: {
          lat: 38.8740467,
          lng: -77.0142583
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 224,
        blackboxId: "b224",
        location: {
          lat: 38.8810911,
          lng: -77.02634
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 225,
        blackboxId: "b225",
        location: {
          lat: 38.8745267,
          lng: -77.0156683
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 226,
        blackboxId: "b226",
        location: {
          lat: 38.88381,
          lng: -77.0460533
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 227,
        blackboxId: "b227",
        location: {
          lat: 38.875135,
          lng: -77.0175367
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 228,
        blackboxId: "b228",
        location: {
          lat: 38.8807267,
          lng: -77.0271067
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 229,
        blackboxId: "b229",
        location: {
          lat: 38.8858017,
          lng: -77.0488883
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 230,
        blackboxId: "b230",
        location: {
          lat: 38.8832995,
          lng: -77.0299816
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 231,
        blackboxId: "b231",
        location: {
          lat: 38.880606,
          lng: -77.0248839
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 232,
        blackboxId: "b232",
        location: {
          lat: 38.8767667,
          lng: -77.0175033
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 233,
        blackboxId: "b233",
        location: {
          lat: 38.8838283,
          lng: -77.0460433
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 234,
        blackboxId: "b234",
        location: {
          lat: 38.87336,
          lng: -77.01859
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 235,
        blackboxId: "b235",
        location: {
          lat: 38.8816766,
          lng: -77.0282548
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 236,
        blackboxId: "b236",
        location: {
          lat: 38.8817983,
          lng: -77.0282317
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 237,
        blackboxId: "b237",
        location: {
          lat: 38.8873158,
          lng: -77.049955
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 238,
        blackboxId: "b238",
        location: {
          lat: 38.8818137,
          lng: -77.0283265
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 239,
        blackboxId: "b239",
        location: {
          lat: 38.881718,
          lng: -77.0283558
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 240,
        blackboxId: "b240",
        location: {
          lat: 38.9019982,
          lng: -77.0338583
        },
        possessionType: "FIELD",
        action: "CHARGE"
      },
      {
        vehicleId: 241,
        blackboxId: "b241",
        location: {
          lat: 38.9032483,
          lng: -77.0395867
        },
        possessionType: "FIELD",
        action: "CHARGE"
      },
      {
        vehicleId: 242,
        blackboxId: "b242",
        location: {
          lat: 38.8975633,
          lng: -77.0315956
        },
        possessionType: "FIELD",
        action: "CHARGE"
      },
      {
        vehicleId: 243,
        blackboxId: "b243",
        location: {
          lat: 38.8922502,
          lng: -77.0484934
        },
        possessionType: "FIELD",
        action: "CHARGEANDRETURN"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.907005,
          lng: -77.0378233
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 1,
        blackboxId: "b1",
        location: {
          lat: 38.9156334,
          lng: -77.0338082
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 2,
        blackboxId: "b2",
        location: {
          lat: 38.904075,
          lng: -77.0241383
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 3,
        blackboxId: "b3",
        location: {
          lat: 38.9042533,
          lng: -77.0243483
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 4,
        blackboxId: "b4",
        location: {
          lat: 38.9179221,
          lng: -77.0427508
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 5,
        blackboxId: "b5",
        location: {
          lat: 38.9042254,
          lng: -77.0487441
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 6,
        blackboxId: "b6",
        location: {
          lat: 38.912005,
          lng: -77.0446083
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 7,
        blackboxId: "b7",
        location: {
          lat: 38.9109083,
          lng: -77.04668
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 8,
        blackboxId: "b8",
        location: {
          lat: 38.9163117,
          lng: -77.04531
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 9,
        blackboxId: "b9",
        location: {
          lat: 38.9112308,
          lng: -77.0269189
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 10,
        blackboxId: "b10",
        location: {
          lat: 38.9193512,
          lng: -77.0305486
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 11,
        blackboxId: "b11",
        location: {
          lat: 38.9057787,
          lng: -77.0418326
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 12,
        blackboxId: "b12",
        location: {
          lat: 38.9217416,
          lng: -77.0412551
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 13,
        blackboxId: "b13",
        location: {
          lat: 38.9073713,
          lng: -77.0481958
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 14,
        blackboxId: "b14",
        location: {
          lat: 38.9111284,
          lng: -77.0339115
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 15,
        blackboxId: "b15",
        location: {
          lat: 38.9090949,
          lng: -77.0260675
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 16,
        blackboxId: "b16",
        location: {
          lat: 38.9188948,
          lng: -77.0447597
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 17,
        blackboxId: "b17",
        location: {
          lat: 38.915925,
          lng: -77.02699
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 18,
        blackboxId: "b18",
        location: {
          lat: 38.910995,
          lng: -77.036295
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 19,
        blackboxId: "b19",
        location: {
          lat: 38.9203525,
          lng: -77.0396969
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 20,
        blackboxId: "b20",
        location: {
          lat: 38.9133525,
          lng: -77.0427292
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 21,
        blackboxId: "b21",
        location: {
          lat: 38.92126,
          lng: -77.0423633
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 22,
        blackboxId: "b22",
        location: {
          lat: 38.91086,
          lng: -77.0413983
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 23,
        blackboxId: "b23",
        location: {
          lat: 38.905495,
          lng: -77.024445
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 24,
        blackboxId: "b24",
        location: {
          lat: 38.9048167,
          lng: -77.0484233
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 25,
        blackboxId: "b25",
        location: {
          lat: 38.913,
          lng: -77.0440683
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 26,
        blackboxId: "b26",
        location: {
          lat: 38.9220517,
          lng: -77.0422983
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 27,
        blackboxId: "b27",
        location: {
          lat: 38.917005,
          lng: -77.0371567
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 28,
        blackboxId: "b28",
        location: {
          lat: 38.9131985,
          lng: -77.0325446
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 29,
        blackboxId: "b29",
        location: {
          lat: 38.9115517,
          lng: -77.031955
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 30,
        blackboxId: "b30",
        location: {
          lat: 38.9076567,
          lng: -77.04336
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 31,
        blackboxId: "b31",
        location: {
          lat: 38.9072733,
          lng: -77.0354967
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 32,
        blackboxId: "b32",
        location: {
          lat: 38.91594,
          lng: -77.0448533
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 33,
        blackboxId: "b33",
        location: {
          lat: 38.9052188,
          lng: -77.0487764
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 34,
        blackboxId: "b34",
        location: {
          lat: 38.9057093,
          lng: -77.0238383
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 35,
        blackboxId: "b35",
        location: {
          lat: 38.9056174,
          lng: -77.0238881
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 36,
        blackboxId: "b36",
        location: {
          lat: 38.9066983,
          lng: -77.04875
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 37,
        blackboxId: "b37",
        location: {
          lat: 38.9219133,
          lng: -77.0389779
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 38,
        blackboxId: "b38",
        location: {
          lat: 38.91196,
          lng: -77.0385717
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 39,
        blackboxId: "b39",
        location: {
          lat: 38.9205415,
          lng: -77.0418899
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 40,
        blackboxId: "b40",
        location: {
          lat: 38.91241,
          lng: -77.02891
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 41,
        blackboxId: "b41",
        location: {
          lat: 38.910656,
          lng: -77.0468501
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 42,
        blackboxId: "b42",
        location: {
          lat: 38.92172,
          lng: -77.0385883
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 43,
        blackboxId: "b43",
        location: {
          lat: 38.907975,
          lng: -77.0317883
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 44,
        blackboxId: "b44",
        location: {
          lat: 38.9057069,
          lng: -77.0333499
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 45,
        blackboxId: "b45",
        location: {
          lat: 38.918365,
          lng: -77.0278117
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 46,
        blackboxId: "b46",
        location: {
          lat: 38.9198335,
          lng: -77.0410401
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 47,
        blackboxId: "b47",
        location: {
          lat: 38.920045,
          lng: -77.041285
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 48,
        blackboxId: "b48",
        location: {
          lat: 38.90607,
          lng: -77.0404817
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 49,
        blackboxId: "b49",
        location: {
          lat: 38.917405472502914,
          lng: -77.03188758031911
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 50,
        blackboxId: "b50",
        location: {
          lat: 38.90934,
          lng: -77.0318367
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 51,
        blackboxId: "b51",
        location: {
          lat: 38.91256,
          lng: -77.0332733
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 52,
        blackboxId: "b52",
        location: {
          lat: 38.907065,
          lng: -77.0465216
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 53,
        blackboxId: "b53",
        location: {
          lat: 38.9127574,
          lng: -77.0383648
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 54,
        blackboxId: "b54",
        location: {
          lat: 38.9168793,
          lng: -77.0269506
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 55,
        blackboxId: "b55",
        location: {
          lat: 38.9073267,
          lng: -77.0423183
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 56,
        blackboxId: "b56",
        location: {
          lat: 38.917965,
          lng: -77.0415067
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 57,
        blackboxId: "b57",
        location: {
          lat: 38.9149059,
          lng: -77.0468358
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 58,
        blackboxId: "b58",
        location: {
          lat: 38.9170985,
          lng: -77.0246464
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 59,
        blackboxId: "b59",
        location: {
          lat: 38.9106799,
          lng: -77.0336085
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 60,
        blackboxId: "b60",
        location: {
          lat: 38.9120157,
          lng: -77.0445543
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 61,
        blackboxId: "b61",
        location: {
          lat: 38.9076817,
          lng: -77.04336
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 62,
        blackboxId: "b62",
        location: {
          lat: 38.9052856,
          lng: -77.0486563
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 63,
        blackboxId: "b63",
        location: {
          lat: 38.9185015,
          lng: -77.028097
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 64,
        blackboxId: "b64",
        location: {
          lat: 38.9062377,
          lng: -77.0239994
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 65,
        blackboxId: "b65",
        location: {
          lat: 38.9095733,
          lng: -77.0486539
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 66,
        blackboxId: "b66",
        location: {
          lat: 38.91905,
          lng: -77.0468298
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 67,
        blackboxId: "b67",
        location: {
          lat: 38.906065,
          lng: -77.04031
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 68,
        blackboxId: "b68",
        location: {
          lat: 38.9169902,
          lng: -77.024109
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 69,
        blackboxId: "b69",
        location: {
          lat: 38.911301,
          lng: -77.0440921
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 70,
        blackboxId: "b70",
        location: {
          lat: 38.9111583,
          lng: -77.0439083
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 71,
        blackboxId: "b71",
        location: {
          lat: 38.9055339,
          lng: -77.0239686
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 72,
        blackboxId: "b72",
        location: {
          lat: 38.914185,
          lng: -77.0461683
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 73,
        blackboxId: "b73",
        location: {
          lat: 38.91266,
          lng: -77.0332317
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 74,
        blackboxId: "b74",
        location: {
          lat: 38.9138569,
          lng: -77.0432765
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 75,
        blackboxId: "b75",
        location: {
          lat: 38.9097833,
          lng: -77.0270867
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 76,
        blackboxId: "b76",
        location: {
          lat: 38.90738,
          lng: -77.0277717
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 77,
        blackboxId: "b77",
        location: {
          lat: 38.9125933,
          lng: -77.04142
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 78,
        blackboxId: "b78",
        location: {
          lat: 38.9098067,
          lng: -77.033185
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 79,
        blackboxId: "b79",
        location: {
          lat: 38.9055889,
          lng: -77.0406364
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 80,
        blackboxId: "b80",
        location: {
          lat: 38.920765,
          lng: -77.038675
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 81,
        blackboxId: "b81",
        location: {
          lat: 38.912045,
          lng: -77.0446583
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 82,
        blackboxId: "b82",
        location: {
          lat: 38.9156288,
          lng: -77.0321461
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 83,
        blackboxId: "b83",
        location: {
          lat: 38.9191159,
          lng: -77.0444789
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 84,
        blackboxId: "b84",
        location: {
          lat: 38.9215495,
          lng: -77.0383422
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 85,
        blackboxId: "b85",
        location: {
          lat: 38.9124684,
          lng: -77.0448734
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 86,
        blackboxId: "b86",
        location: {
          lat: 38.9065511,
          lng: -77.0385136
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 87,
        blackboxId: "b87",
        location: {
          lat: 38.90649,
          lng: -77.0316233
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 88,
        blackboxId: "b88",
        location: {
          lat: 38.9141813,
          lng: -77.038067
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 89,
        blackboxId: "b89",
        location: {
          lat: 38.9081645,
          lng: -77.0487467
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 90,
        blackboxId: "b90",
        location: {
          lat: 38.9086983,
          lng: -77.0483217
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 91,
        blackboxId: "b91",
        location: {
          lat: 38.9040375,
          lng: -77.0402324
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 92,
        blackboxId: "b92",
        location: {
          lat: 38.9100728,
          lng: -77.0384782
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 93,
        blackboxId: "b93",
        location: {
          lat: 38.908243,
          lng: -77.0385553
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 94,
        blackboxId: "b94",
        location: {
          lat: 38.9055751,
          lng: -77.0241399
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 95,
        blackboxId: "b95",
        location: {
          lat: 38.9217317,
          lng: -77.0422817
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 96,
        blackboxId: "b96",
        location: {
          lat: 38.9073259,
          lng: -77.0504803
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 97,
        blackboxId: "b97",
        location: {
          lat: 38.9040333,
          lng: -77.0532333
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 98,
        blackboxId: "b98",
        location: {
          lat: 38.9062275,
          lng: -77.0578978
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 99,
        blackboxId: "b99",
        location: {
          lat: 38.904365,
          lng: -77.053095
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 100,
        blackboxId: "b100",
        location: {
          lat: 38.9007615,
          lng: -77.0569766
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 101,
        blackboxId: "b101",
        location: {
          lat: 38.9051124,
          lng: -77.0579998
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 102,
        blackboxId: "b102",
        location: {
          lat: 38.9128033,
          lng: -77.051525
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 103,
        blackboxId: "b103",
        location: {
          lat: 38.9060831,
          lng: -77.0566666
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 104,
        blackboxId: "b104",
        location: {
          lat: 38.9107717,
          lng: -77.0519533
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 105,
        blackboxId: "b105",
        location: {
          lat: 38.90709,
          lng: -77.05006
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 106,
        blackboxId: "b106",
        location: {
          lat: 38.9107683,
          lng: -77.05275
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 107,
        blackboxId: "b107",
        location: {
          lat: 38.9025717,
          lng: -77.0581267
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 108,
        blackboxId: "b108",
        location: {
          lat: 38.8999717,
          lng: -77.0570732
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 109,
        blackboxId: "b109",
        location: {
          lat: 38.895765,
          lng: -77.0544783
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 110,
        blackboxId: "b110",
        location: {
          lat: 38.9053183,
          lng: -77.0581083
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 111,
        blackboxId: "b111",
        location: {
          lat: 38.9053669,
          lng: -77.0569521
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 112,
        blackboxId: "b112",
        location: {
          lat: 38.907155,
          lng: -77.0500517
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 113,
        blackboxId: "b113",
        location: {
          lat: 38.8974883,
          lng: -77.0557101
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 114,
        blackboxId: "b114",
        location: {
          lat: 38.9104578,
          lng: -77.0518509
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 115,
        blackboxId: "b115",
        location: {
          lat: 38.9052263,
          lng: -77.0515559
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 116,
        blackboxId: "b116",
        location: {
          lat: 38.9103501,
          lng: -77.0517947
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 117,
        blackboxId: "b117",
        location: {
          lat: 38.9051445,
          lng: -77.0584634
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 118,
        blackboxId: "b118",
        location: {
          lat: 38.8940184,
          lng: -77.0558167
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 119,
        blackboxId: "b119",
        location: {
          lat: 38.9066743,
          lng: -77.0514697
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 120,
        blackboxId: "b120",
        location: {
          lat: 38.910485,
          lng: -77.0518683
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 121,
        blackboxId: "b121",
        location: {
          lat: 38.9093617,
          lng: -77.05531
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 122,
        blackboxId: "b122",
        location: {
          lat: 38.905235,
          lng: -77.0515134
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 123,
        blackboxId: "b123",
        location: {
          lat: 38.9051967,
          lng: -77.0515767
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 124,
        blackboxId: "b124",
        location: {
          lat: 38.9071134,
          lng: -77.0499584
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 125,
        blackboxId: "b125",
        location: {
          lat: 38.9054433,
          lng: -77.0497283
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 126,
        blackboxId: "b126",
        location: {
          lat: 38.9006802,
          lng: -77.058404
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 127,
        blackboxId: "b127",
        location: {
          lat: 38.9008133,
          lng: -77.057
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 128,
        blackboxId: "b128",
        location: {
          lat: 38.904925,
          lng: -77.05118
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 129,
        blackboxId: "b129",
        location: {
          lat: 38.9085901,
          lng: -77.0582591
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 130,
        blackboxId: "b130",
        location: {
          lat: 38.9042567,
          lng: -77.0531633
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 131,
        blackboxId: "b131",
        location: {
          lat: 38.9160235,
          lng: -77.0561465
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 132,
        blackboxId: "b132",
        location: {
          lat: 38.9104783,
          lng: -77.0517683
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 133,
        blackboxId: "b133",
        location: {
          lat: 38.9106544,
          lng: -77.0518699
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 134,
        blackboxId: "b134",
        location: {
          lat: 38.9067631,
          lng: -77.0529268
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 135,
        blackboxId: "b135",
        location: {
          lat: 38.9053267,
          lng: -77.0571683
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 136,
        blackboxId: "b136",
        location: {
          lat: 38.9039951,
          lng: -77.0532596
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 137,
        blackboxId: "b137",
        location: {
          lat: 38.910651,
          lng: -77.0518971
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 138,
        blackboxId: "b138",
        location: {
          lat: 38.9165594,
          lng: -77.0567189
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 139,
        blackboxId: "b139",
        location: {
          lat: 38.9025042,
          lng: -77.0545896
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 140,
        blackboxId: "b140",
        location: {
          lat: 38.90523259065943,
          lng: -77.05351989723468
        },
        possessionType: "FIELD",
        action: "GROUNDED"
      },
      {
        vehicleId: 141,
        blackboxId: "b141",
        location: {
          lat: 38.9042835,
          lng: -77.0336898
        },
        possessionType: "FIELD",
        action: "CHARGE"
      },
      {
        vehicleId: 142,
        blackboxId: "b142",
        location: {
          lat: 38.9215717,
          lng: -77.0346317
        },
        possessionType: "FIELD",
        action: "CHARGE"
      },
      {
        vehicleId: 143,
        blackboxId: "b143",
        location: {
          lat: 38.91929,
          lng: -77.0420183
        },
        possessionType: "FIELD",
        action: "CHARGE"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.8781636,
          lng: -76.9950925
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 1,
        blackboxId: "b1",
        location: {
          lat: 38.889745,
          lng: -76.9803317
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 2,
        blackboxId: "b2",
        location: {
          lat: 38.886695,
          lng: -76.9975066
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 3,
        blackboxId: "b3",
        location: {
          lat: 38.8755483,
          lng: -77.0004699
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 4,
        blackboxId: "b4",
        location: {
          lat: 38.876495,
          lng: -77.0074933
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 5,
        blackboxId: "b5",
        location: {
          lat: 38.8757383,
          lng: -77.0037
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 6,
        blackboxId: "b6",
        location: {
          lat: 38.8765806,
          lng: -76.9930533
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 7,
        blackboxId: "b7",
        location: {
          lat: 38.880205,
          lng: -77.0099917
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 8,
        blackboxId: "b8",
        location: {
          lat: 38.8861248,
          lng: -77.0034367
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 9,
        blackboxId: "b9",
        location: {
          lat: 38.8679483,
          lng: -76.9791767
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 10,
        blackboxId: "b10",
        location: {
          lat: 38.8679767,
          lng: -76.9790533
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 11,
        blackboxId: "b11",
        location: {
          lat: 38.8801667,
          lng: -77.0087217
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 12,
        blackboxId: "b12",
        location: {
          lat: 38.875872,
          lng: -77.0061258
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 13,
        blackboxId: "b13",
        location: {
          lat: 38.8794767,
          lng: -77.00565
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 14,
        blackboxId: "b14",
        location: {
          lat: 38.8668,
          lng: -76.9888783
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 15,
        blackboxId: "b15",
        location: {
          lat: 38.8661728,
          lng: -76.9819081
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 16,
        blackboxId: "b16",
        location: {
          lat: 38.8666715,
          lng: -76.9891405
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 17,
        blackboxId: "b17",
        location: {
          lat: 38.874775,
          lng: -77.007905
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 18,
        blackboxId: "b18",
        location: {
          lat: 38.8668853,
          lng: -76.9889323
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 19,
        blackboxId: "b19",
        location: {
          lat: 38.8666465,
          lng: -76.9890928
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 20,
        blackboxId: "b20",
        location: {
          lat: 38.8657733,
          lng: -76.9894367
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 21,
        blackboxId: "b21",
        location: {
          lat: 38.8621083,
          lng: -76.9869033
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 22,
        blackboxId: "b22",
        location: {
          lat: 38.8798633,
          lng: -76.9950883
        },
        possessionType: "FIELD",
        action: "CHARGE"
      },
      {
        vehicleId: 23,
        blackboxId: "b23",
        location: {
          lat: 38.8821267,
          lng: -76.994825
        },
        possessionType: "FIELD",
        action: "CHARGE"
      },
      {
        vehicleId: 24,
        blackboxId: "b24",
        location: {
          lat: 38.8853499,
          lng: -76.97878
        },
        possessionType: "FIELD",
        action: "CHARGE"
      },
      {
        vehicleId: 25,
        blackboxId: "b25",
        location: {
          lat: 38.8734567,
          lng: -77.009155
        },
        possessionType: "FIELD",
        action: "CHARGE"
      },
      {
        vehicleId: 26,
        blackboxId: "b26",
        location: {
          lat: 38.8679683,
          lng: -76.9848517
        },
        possessionType: "FIELD",
        action: "CHARGEANDRETURN"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.92968,
          lng: -77.0432883
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 1,
        blackboxId: "b1",
        location: {
          lat: 38.9348837,
          lng: -77.0283589
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 2,
        blackboxId: "b2",
        location: {
          lat: 38.9304687,
          lng: -77.0380695
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 3,
        blackboxId: "b3",
        location: {
          lat: 38.9309561,
          lng: -77.036594
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 4,
        blackboxId: "b4",
        location: {
          lat: 38.9370617,
          lng: -77.0239417
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 5,
        blackboxId: "b5",
        location: {
          lat: 38.9301883,
          lng: -77.0376899
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 6,
        blackboxId: "b6",
        location: {
          lat: 38.9366367,
          lng: -77.024415
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 7,
        blackboxId: "b7",
        location: {
          lat: 38.9451017,
          lng: -77.0345
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 8,
        blackboxId: "b8",
        location: {
          lat: 38.9308333,
          lng: -77.0234467
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 9,
        blackboxId: "b9",
        location: {
          lat: 38.9308667,
          lng: -77.0336983
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 10,
        blackboxId: "b10",
        location: {
          lat: 38.9368342,
          lng: -77.0242821
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 11,
        blackboxId: "b11",
        location: {
          lat: 38.945086,
          lng: -77.0344749
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 12,
        blackboxId: "b12",
        location: {
          lat: 38.9276098,
          lng: -77.0338325
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 13,
        blackboxId: "b13",
        location: {
          lat: 38.937408,
          lng: -77.036312
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 14,
        blackboxId: "b14",
        location: {
          lat: 38.945075,
          lng: -77.03437
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 15,
        blackboxId: "b15",
        location: {
          lat: 38.9297656,
          lng: -77.0231122
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 16,
        blackboxId: "b16",
        location: {
          lat: 38.9450967,
          lng: -77.03439
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 17,
        blackboxId: "b17",
        location: {
          lat: 38.9359267,
          lng: -77.037885
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 18,
        blackboxId: "b18",
        location: {
          lat: 38.9332983,
          lng: -77.0438333
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 19,
        blackboxId: "b19",
        location: {
          lat: 38.9323687,
          lng: -77.0307498
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 20,
        blackboxId: "b20",
        location: {
          lat: 38.9461283,
          lng: -77.0343417
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 21,
        blackboxId: "b21",
        location: {
          lat: 38.9450287,
          lng: -77.0343557
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 22,
        blackboxId: "b22",
        location: {
          lat: 38.932305,
          lng: -77.0387268
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 23,
        blackboxId: "b23",
        location: {
          lat: 38.93678,
          lng: -77.0240733
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 24,
        blackboxId: "b24",
        location: {
          lat: 38.932785,
          lng: -77.0329167
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 25,
        blackboxId: "b25",
        location: {
          lat: 38.9375851,
          lng: -77.03258
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 26,
        blackboxId: "b26",
        location: {
          lat: 38.929515,
          lng: -77.031075
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 27,
        blackboxId: "b27",
        location: {
          lat: 38.9451724,
          lng: -77.0344668
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 28,
        blackboxId: "b28",
        location: {
          lat: 38.9366144,
          lng: -77.0365949
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 29,
        blackboxId: "b29",
        location: {
          lat: 38.9367485,
          lng: -77.0241625
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 30,
        blackboxId: "b30",
        location: {
          lat: 38.92357,
          lng: -77.052395
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 31,
        blackboxId: "b31",
        location: {
          lat: 38.923645,
          lng: -77.0525333
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 32,
        blackboxId: "b32",
        location: {
          lat: 38.9182886,
          lng: -77.0596844
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 33,
        blackboxId: "b33",
        location: {
          lat: 38.9236383,
          lng: -77.0525335
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 34,
        blackboxId: "b34",
        location: {
          lat: 38.9236617,
          lng: -77.052567
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 35,
        blackboxId: "b35",
        location: {
          lat: 38.9237332,
          lng: -77.0515133
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 36,
        blackboxId: "b36",
        location: {
          lat: 38.923725,
          lng: -77.0515317
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 37,
        blackboxId: "b37",
        location: {
          lat: 38.9184161,
          lng: -77.0600298
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 38,
        blackboxId: "b38",
        location: {
          lat: 38.9247596,
          lng: -77.0523609
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 39,
        blackboxId: "b39",
        location: {
          lat: 38.92469,
          lng: -77.0522867
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 40,
        blackboxId: "b40",
        location: {
          lat: 38.92465,
          lng: -77.0523283
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 41,
        blackboxId: "b41",
        location: {
          lat: 38.923795,
          lng: -77.051475
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 42,
        blackboxId: "b42",
        location: {
          lat: 38.919885,
          lng: -77.0612483
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 43,
        blackboxId: "b43",
        location: {
          lat: 38.9237217,
          lng: -77.05257
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 44,
        blackboxId: "b44",
        location: {
          lat: 38.9238183,
          lng: -77.0515633
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 45,
        blackboxId: "b45",
        location: {
          lat: 38.9247122,
          lng: -77.0523525
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 46,
        blackboxId: "b46",
        location: {
          lat: 38.9181383,
          lng: -77.0588633
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 47,
        blackboxId: "b47",
        location: {
          lat: 38.9370054,
          lng: -77.0239268
        },
        possessionType: "FIELD",
        action: "CHARGE"
      },
      {
        vehicleId: 48,
        blackboxId: "b48",
        location: {
          lat: 38.9288883,
          lng: -77.0330967
        },
        possessionType: "FIELD",
        action: "CHARGE"
      },
      {
        vehicleId: 49,
        blackboxId: "b49",
        location: {
          lat: 38.9351893,
          lng: -77.0253888
        },
        possessionType: "FIELD",
        action: "CHARGE"
      },
      {
        vehicleId: 50,
        blackboxId: "b50",
        location: {
          lat: 38.9308922,
          lng: -77.0239879
        },
        possessionType: "FIELD",
        action: "CHARGE"
      },
      {
        vehicleId: 51,
        blackboxId: "b51",
        location: {
          lat: 38.9359033,
          lng: -77.0351333
        },
        possessionType: "FIELD",
        action: "CHARGE"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.9462633,
          lng: -77.0326267
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 1,
        blackboxId: "b1",
        location: {
          lat: 38.9566891,
          lng: -77.0276522
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 2,
        blackboxId: "b2",
        location: {
          lat: 38.9549,
          lng: -77.027905
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 3,
        blackboxId: "b3",
        location: {
          lat: 38.9380711,
          lng: -77.0189265
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 4,
        blackboxId: "b4",
        location: {
          lat: 38.9563067,
          lng: -77.0281217
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 5,
        blackboxId: "b5",
        location: {
          lat: 38.9525428,
          lng: -77.0274254
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 6,
        blackboxId: "b6",
        location: {
          lat: 38.9350915,
          lng: -77.0209967
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 7,
        blackboxId: "b7",
        location: {
          lat: 38.9559943,
          lng: -77.0206773
        },
        possessionType: "FIELD",
        action: "CHARGE"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.8935207,
          lng: -76.950188
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 1,
        blackboxId: "b1",
        location: {
          lat: 38.8905066,
          lng: -76.9375211
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 2,
        blackboxId: "b2",
        location: {
          lat: 38.89624,
          lng: -76.9482817
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 3,
        blackboxId: "b3",
        location: {
          lat: 38.8904667,
          lng: -76.9375517
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 4,
        blackboxId: "b4",
        location: {
          lat: 38.893665,
          lng: -76.950115
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 5,
        blackboxId: "b5",
        location: {
          lat: 38.89051,
          lng: -76.9375
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 6,
        blackboxId: "b6",
        location: {
          lat: 38.893785,
          lng: -76.9500915
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 7,
        blackboxId: "b7",
        location: {
          lat: 38.893715,
          lng: -76.950055
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 8,
        blackboxId: "b8",
        location: {
          lat: 38.89365,
          lng: -76.950125
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 9,
        blackboxId: "b9",
        location: {
          lat: 38.8962617,
          lng: -76.948265
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 10,
        blackboxId: "b10",
        location: {
          lat: 38.8961788,
          lng: -76.9482389
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 11,
        blackboxId: "b11",
        location: {
          lat: 38.8902683,
          lng: -76.93761
        },
        possessionType: "FIELD",
        action: "CHARGE"
      },
      {
        vehicleId: 12,
        blackboxId: "b12",
        location: {
          lat: 38.9069617,
          lng: -76.9524783
        },
        possessionType: "FIELD",
        action: "CHARGE"
      },
      {
        vehicleId: 13,
        blackboxId: "b13",
        location: {
          lat: 38.8941293,
          lng: -76.9388763
        },
        possessionType: "FIELD",
        action: "CHARGE"
      },
      {
        vehicleId: 14,
        blackboxId: "b14",
        location: {
          lat: 38.8828358,
          lng: -76.9321915
        },
        possessionType: "FIELD",
        action: "CHARGEANDRETURN"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.889875,
          lng: -77.08747
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 1,
        blackboxId: "b1",
        location: {
          lat: 38.897389,
          lng: -77.088447
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 2,
        blackboxId: "b2",
        location: {
          lat: 38.8939867,
          lng: -77.0848233
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 3,
        blackboxId: "b3",
        location: {
          lat: 38.8879152,
          lng: -77.0810214
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 4,
        blackboxId: "b4",
        location: {
          lat: 38.8931785,
          lng: -77.0902161
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 5,
        blackboxId: "b5",
        location: {
          lat: 38.8893441,
          lng: -77.0916934
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 6,
        blackboxId: "b6",
        location: {
          lat: 38.8930133,
          lng: -77.07852
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 7,
        blackboxId: "b7",
        location: {
          lat: 38.887673,
          lng: -77.08823
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 8,
        blackboxId: "b8",
        location: {
          lat: 38.8840333,
          lng: -77.102315
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 9,
        blackboxId: "b9",
        location: {
          lat: 38.8920175,
          lng: -77.0842427
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 10,
        blackboxId: "b10",
        location: {
          lat: 38.8938773,
          lng: -77.0755964
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 11,
        blackboxId: "b11",
        location: {
          lat: 38.889085,
          lng: -77.08973
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 12,
        blackboxId: "b12",
        location: {
          lat: 38.8775117,
          lng: -77.1055417
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 13,
        blackboxId: "b13",
        location: {
          lat: 38.8938537,
          lng: -77.0846827
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 14,
        blackboxId: "b14",
        location: {
          lat: 38.8854688,
          lng: -77.093776
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 15,
        blackboxId: "b15",
        location: {
          lat: 38.8884633,
          lng: -77.0847283
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 16,
        blackboxId: "b16",
        location: {
          lat: 38.889515,
          lng: -77.09059
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 17,
        blackboxId: "b17",
        location: {
          lat: 38.8858601,
          lng: -77.0879298
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 18,
        blackboxId: "b18",
        location: {
          lat: 38.89238,
          lng: -77.0818483
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 19,
        blackboxId: "b19",
        location: {
          lat: 38.8754884,
          lng: -77.0862083
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 20,
        blackboxId: "b20",
        location: {
          lat: 38.894705,
          lng: -77.0723883
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 21,
        blackboxId: "b21",
        location: {
          lat: 38.893355,
          lng: -77.080185
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 22,
        blackboxId: "b22",
        location: {
          lat: 38.88114,
          lng: -77.1066633
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 23,
        blackboxId: "b23",
        location: {
          lat: 38.8941583,
          lng: -77.0767517
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 24,
        blackboxId: "b24",
        location: {
          lat: 38.8929583,
          lng: -77.078795
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 25,
        blackboxId: "b25",
        location: {
          lat: 38.8935367,
          lng: -77.0755851
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 26,
        blackboxId: "b26",
        location: {
          lat: 38.8838233,
          lng: -77.0989517
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 27,
        blackboxId: "b27",
        location: {
          lat: 38.8915066,
          lng: -77.0855024
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 28,
        blackboxId: "b28",
        location: {
          lat: 38.8934042,
          lng: -77.0825269
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 29,
        blackboxId: "b29",
        location: {
          lat: 38.8931688,
          lng: -77.0783948
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 30,
        blackboxId: "b30",
        location: {
          lat: 38.8889817,
          lng: -77.089705
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 31,
        blackboxId: "b31",
        location: {
          lat: 38.8929561,
          lng: -77.0822488
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 32,
        blackboxId: "b32",
        location: {
          lat: 38.8957633,
          lng: -77.0722367
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 33,
        blackboxId: "b33",
        location: {
          lat: 38.889375,
          lng: -77.09162
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 34,
        blackboxId: "b34",
        location: {
          lat: 38.8901567,
          lng: -77.0886867
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 35,
        blackboxId: "b35",
        location: {
          lat: 38.8865187,
          lng: -77.097325
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 36,
        blackboxId: "b36",
        location: {
          lat: 38.8826867,
          lng: -77.1033217
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 37,
        blackboxId: "b37",
        location: {
          lat: 38.8973219,
          lng: -77.0877242
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 38,
        blackboxId: "b38",
        location: {
          lat: 38.8886083,
          lng: -77.08913
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 39,
        blackboxId: "b39",
        location: {
          lat: 38.8914365,
          lng: -77.0784004
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 40,
        blackboxId: "b40",
        location: {
          lat: 38.8865571,
          lng: -77.0955816
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 41,
        blackboxId: "b41",
        location: {
          lat: 38.9059983,
          lng: -77.0716167
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 42,
        blackboxId: "b42",
        location: {
          lat: 38.8970517,
          lng: -77.0786183
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 43,
        blackboxId: "b43",
        location: {
          lat: 38.8931882,
          lng: -77.0805669
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 44,
        blackboxId: "b44",
        location: {
          lat: 38.8857067,
          lng: -77.0947
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 45,
        blackboxId: "b45",
        location: {
          lat: 38.882985,
          lng: -77.0861567
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 46,
        blackboxId: "b46",
        location: {
          lat: 38.8921017,
          lng: -77.0807983
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 47,
        blackboxId: "b47",
        location: {
          lat: 38.8888967,
          lng: -77.093
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 48,
        blackboxId: "b48",
        location: {
          lat: 38.8956421,
          lng: -77.1009781
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 49,
        blackboxId: "b49",
        location: {
          lat: 38.9060517,
          lng: -77.071625
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 50,
        blackboxId: "b50",
        location: {
          lat: 38.883882,
          lng: -77.0989522
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 51,
        blackboxId: "b51",
        location: {
          lat: 38.8926776,
          lng: -77.0796743
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 52,
        blackboxId: "b52",
        location: {
          lat: 38.8953667,
          lng: -77.0707983
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 53,
        blackboxId: "b53",
        location: {
          lat: 38.8948517,
          lng: -77.0753067
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 54,
        blackboxId: "b54",
        location: {
          lat: 38.8898267,
          lng: -77.0886817
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 55,
        blackboxId: "b55",
        location: {
          lat: 38.8951983,
          lng: -77.0819333
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 56,
        blackboxId: "b56",
        location: {
          lat: 38.8952625,
          lng: -77.0732156
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 57,
        blackboxId: "b57",
        location: {
          lat: 38.88273,
          lng: -77.1031617
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 58,
        blackboxId: "b58",
        location: {
          lat: 38.9059318,
          lng: -77.0716788
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 59,
        blackboxId: "b59",
        location: {
          lat: 38.8937299,
          lng: -77.074644
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 60,
        blackboxId: "b60",
        location: {
          lat: 38.8925951,
          lng: -77.0798906
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 61,
        blackboxId: "b61",
        location: {
          lat: 38.8874348,
          lng: -77.0881971
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 62,
        blackboxId: "b62",
        location: {
          lat: 38.893105,
          lng: -77.0803833
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 63,
        blackboxId: "b63",
        location: {
          lat: 38.8906217,
          lng: -77.0855717
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 64,
        blackboxId: "b64",
        location: {
          lat: 38.8938938,
          lng: -77.0771483
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 65,
        blackboxId: "b65",
        location: {
          lat: 38.8894483,
          lng: -77.0838968
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 66,
        blackboxId: "b66",
        location: {
          lat: 38.895283,
          lng: -77.0732589
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 67,
        blackboxId: "b67",
        location: {
          lat: 38.8884183,
          lng: -77.0848408
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 68,
        blackboxId: "b68",
        location: {
          lat: 38.889405,
          lng: -77.0839717
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 69,
        blackboxId: "b69",
        location: {
          lat: 38.8898576,
          lng: -77.0875511
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 70,
        blackboxId: "b70",
        location: {
          lat: 38.8766367,
          lng: -77.0980883
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 71,
        blackboxId: "b71",
        location: {
          lat: 38.8884183,
          lng: -77.0848167
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 72,
        blackboxId: "b72",
        location: {
          lat: 38.8931157,
          lng: -77.0785408
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 73,
        blackboxId: "b73",
        location: {
          lat: 38.8983031,
          lng: -77.0709982
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 74,
        blackboxId: "b74",
        location: {
          lat: 38.891315,
          lng: -77.085765
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 75,
        blackboxId: "b75",
        location: {
          lat: 38.8960646,
          lng: -77.0784884
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 76,
        blackboxId: "b76",
        location: {
          lat: 38.874961,
          lng: -77.087618
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 77,
        blackboxId: "b77",
        location: {
          lat: 38.8826267,
          lng: -77.1032833
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 78,
        blackboxId: "b78",
        location: {
          lat: 38.8859553,
          lng: -77.0978572
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 79,
        blackboxId: "b79",
        location: {
          lat: 38.8935771,
          lng: -77.0755553
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 80,
        blackboxId: "b80",
        location: {
          lat: 38.8875217,
          lng: -77.0958933
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 81,
        blackboxId: "b81",
        location: {
          lat: 38.88198,
          lng: -77.0885031
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 82,
        blackboxId: "b82",
        location: {
          lat: 38.8893667,
          lng: -77.0916
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 83,
        blackboxId: "b83",
        location: {
          lat: 38.8952117,
          lng: -77.0818801
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 84,
        blackboxId: "b84",
        location: {
          lat: 38.8883683,
          lng: -77.0848217
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 85,
        blackboxId: "b85",
        location: {
          lat: 38.89309,
          lng: -77.0785267
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 86,
        blackboxId: "b86",
        location: {
          lat: 38.8938067,
          lng: -77.0746333
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 87,
        blackboxId: "b87",
        location: {
          lat: 38.8935627,
          lng: -77.0858994
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 88,
        blackboxId: "b88",
        location: {
          lat: 38.898,
          lng: -77.071005
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 89,
        blackboxId: "b89",
        location: {
          lat: 38.8876338,
          lng: -77.0882395
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 90,
        blackboxId: "b90",
        location: {
          lat: 38.8959451,
          lng: -77.0784996
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 91,
        blackboxId: "b91",
        location: {
          lat: 38.8933683,
          lng: -77.08012
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 92,
        blackboxId: "b92",
        location: {
          lat: 38.883255,
          lng: -77.0933433
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 93,
        blackboxId: "b93",
        location: {
          lat: 38.8888633,
          lng: -77.0904517
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 94,
        blackboxId: "b94",
        location: {
          lat: 38.8885779,
          lng: -77.0766337
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 95,
        blackboxId: "b95",
        location: {
          lat: 38.8872267,
          lng: -77.0881583
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 96,
        blackboxId: "b96",
        location: {
          lat: 38.8961519,
          lng: -77.0740494
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 97,
        blackboxId: "b97",
        location: {
          lat: 38.8898433,
          lng: -77.081735
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 98,
        blackboxId: "b98",
        location: {
          lat: 38.8960152,
          lng: -77.07222
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 99,
        blackboxId: "b99",
        location: {
          lat: 38.8888833,
          lng: -77.0904833
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 100,
        blackboxId: "b100",
        location: {
          lat: 38.8976733,
          lng: -77.0837267
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 101,
        blackboxId: "b101",
        location: {
          lat: 38.8916783,
          lng: -77.0808683
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 102,
        blackboxId: "b102",
        location: {
          lat: 38.8933767,
          lng: -77.0801783
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 103,
        blackboxId: "b103",
        location: {
          lat: 38.8950733,
          lng: -77.081865
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 104,
        blackboxId: "b104",
        location: {
          lat: 38.8893751,
          lng: -77.0916134
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 105,
        blackboxId: "b105",
        location: {
          lat: 38.892495,
          lng: -77.0819583
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 106,
        blackboxId: "b106",
        location: {
          lat: 38.89141,
          lng: -77.078365
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 107,
        blackboxId: "b107",
        location: {
          lat: 38.8900277,
          lng: -77.0895058
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 108,
        blackboxId: "b108",
        location: {
          lat: 38.8881317,
          lng: -77.09428
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 109,
        blackboxId: "b109",
        location: {
          lat: 38.8937835,
          lng: -77.0745836
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 110,
        blackboxId: "b110",
        location: {
          lat: 38.895105,
          lng: -77.0710583
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 111,
        blackboxId: "b111",
        location: {
          lat: 38.8939568,
          lng: -77.0845908
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 112,
        blackboxId: "b112",
        location: {
          lat: 38.8968315,
          lng: -77.0855106
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 113,
        blackboxId: "b113",
        location: {
          lat: 38.8819705,
          lng: -77.1063448
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 114,
        blackboxId: "b114",
        location: {
          lat: 38.8857355,
          lng: -77.0944856
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 115,
        blackboxId: "b115",
        location: {
          lat: 38.8942382,
          lng: -77.068987
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 116,
        blackboxId: "b116",
        location: {
          lat: 38.8929455,
          lng: -77.0787738
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 117,
        blackboxId: "b117",
        location: {
          lat: 38.893895,
          lng: -77.0846967
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 118,
        blackboxId: "b118",
        location: {
          lat: 38.8952039,
          lng: -77.0704193
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 119,
        blackboxId: "b119",
        location: {
          lat: 38.8936683,
          lng: -77.0755233
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 120,
        blackboxId: "b120",
        location: {
          lat: 38.88453,
          lng: -77.0883267
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 121,
        blackboxId: "b121",
        location: {
          lat: 38.891278,
          lng: -77.0858302
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 122,
        blackboxId: "b122",
        location: {
          lat: 38.8952908,
          lng: -77.0732089
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 123,
        blackboxId: "b123",
        location: {
          lat: 38.8856575,
          lng: -77.0946062
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 124,
        blackboxId: "b124",
        location: {
          lat: 38.8951817,
          lng: -77.08187
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 125,
        blackboxId: "b125",
        location: {
          lat: 38.890917,
          lng: -77.0863412
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 126,
        blackboxId: "b126",
        location: {
          lat: 38.8899706,
          lng: -77.0895582
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 127,
        blackboxId: "b127",
        location: {
          lat: 38.89474,
          lng: -77.0753667
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 128,
        blackboxId: "b128",
        location: {
          lat: 38.8863159,
          lng: -77.0931592
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 129,
        blackboxId: "b129",
        location: {
          lat: 38.8926733,
          lng: -77.0797183
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 130,
        blackboxId: "b130",
        location: {
          lat: 38.8883633,
          lng: -77.08483
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 131,
        blackboxId: "b131",
        location: {
          lat: 38.8930811,
          lng: -77.0803973
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 132,
        blackboxId: "b132",
        location: {
          lat: 38.885855,
          lng: -77.0944433
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 133,
        blackboxId: "b133",
        location: {
          lat: 38.8888573,
          lng: -77.0929548
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 134,
        blackboxId: "b134",
        location: {
          lat: 38.8962483,
          lng: -77.07404
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 135,
        blackboxId: "b135",
        location: {
          lat: 38.8923867,
          lng: -77.0819183
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 136,
        blackboxId: "b136",
        location: {
          lat: 38.8933483,
          lng: -77.076375
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 137,
        blackboxId: "b137",
        location: {
          lat: 38.8932956,
          lng: -77.0762182
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 138,
        blackboxId: "b138",
        location: {
          lat: 38.89482,
          lng: -77.0754483
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 139,
        blackboxId: "b139",
        location: {
          lat: 38.8862417,
          lng: -77.0966433
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 140,
        blackboxId: "b140",
        location: {
          lat: 38.887745,
          lng: -77.0881967
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 141,
        blackboxId: "b141",
        location: {
          lat: 38.8912433,
          lng: -77.0857933
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 142,
        blackboxId: "b142",
        location: {
          lat: 38.8873751,
          lng: -77.0788211
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 143,
        blackboxId: "b143",
        location: {
          lat: 38.8896167,
          lng: -77.0835317
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 144,
        blackboxId: "b144",
        location: {
          lat: 38.895195,
          lng: -77.0697883
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 145,
        blackboxId: "b145",
        location: {
          lat: 38.8858367,
          lng: -77.0878983
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 146,
        blackboxId: "b146",
        location: {
          lat: 38.8781217,
          lng: -77.0939
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 147,
        blackboxId: "b147",
        location: {
          lat: 38.8905051,
          lng: -77.0848429
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 148,
        blackboxId: "b148",
        location: {
          lat: 38.8881817,
          lng: -77.0848517
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 149,
        blackboxId: "b149",
        location: {
          lat: 38.879798,
          lng: -77.0902648
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 150,
        blackboxId: "b150",
        location: {
          lat: 38.8884283,
          lng: -77.0847833
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 151,
        blackboxId: "b151",
        location: {
          lat: 38.8938683,
          lng: -77.0846883
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 152,
        blackboxId: "b152",
        location: {
          lat: 38.8976533,
          lng: -77.0837933
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 153,
        blackboxId: "b153",
        location: {
          lat: 38.8942333,
          lng: -77.0768683
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 154,
        blackboxId: "b154",
        location: {
          lat: 38.89762,
          lng: -77.06751
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 155,
        blackboxId: "b155",
        location: {
          lat: 38.8883617,
          lng: -77.0739617
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 156,
        blackboxId: "b156",
        location: {
          lat: 38.8895217,
          lng: -77.0838433
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 157,
        blackboxId: "b157",
        location: {
          lat: 38.88964,
          lng: -77.0825983
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 158,
        blackboxId: "b158",
        location: {
          lat: 38.8884949,
          lng: -77.0853707
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 159,
        blackboxId: "b159",
        location: {
          lat: 38.8876767,
          lng: -77.0882367
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 160,
        blackboxId: "b160",
        location: {
          lat: 38.894985,
          lng: -77.0702468
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 161,
        blackboxId: "b161",
        location: {
          lat: 38.893295,
          lng: -77.076515
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 162,
        blackboxId: "b162",
        location: {
          lat: 38.8961164,
          lng: -77.0740413
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 163,
        blackboxId: "b163",
        location: {
          lat: 38.8909,
          lng: -77.0875033
        },
        possessionType: "FIELD",
        action: "CHARGEANDRETURN"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.91196,
          lng: -77.0693533
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 1,
        blackboxId: "b1",
        location: {
          lat: 38.90562,
          lng: -77.06163
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 2,
        blackboxId: "b2",
        location: {
          lat: 38.9048029,
          lng: -77.0600922
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 3,
        blackboxId: "b3",
        location: {
          lat: 38.9176674,
          lng: -77.0694701
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 4,
        blackboxId: "b4",
        location: {
          lat: 38.9052825,
          lng: -77.0590724
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 5,
        blackboxId: "b5",
        location: {
          lat: 38.9067417,
          lng: -77.06283
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 6,
        blackboxId: "b6",
        location: {
          lat: 38.9248322,
          lng: -77.0730941
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 7,
        blackboxId: "b7",
        location: {
          lat: 38.9192733,
          lng: -77.0706567
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 8,
        blackboxId: "b8",
        location: {
          lat: 38.9068617,
          lng: -77.0637469
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 9,
        blackboxId: "b9",
        location: {
          lat: 38.9026115,
          lng: -77.0615636
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 10,
        blackboxId: "b10",
        location: {
          lat: 38.90402,
          lng: -77.0652183
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 11,
        blackboxId: "b11",
        location: {
          lat: 38.9076999,
          lng: -77.0689908
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 12,
        blackboxId: "b12",
        location: {
          lat: 38.90232,
          lng: -77.0604983
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 13,
        blackboxId: "b13",
        location: {
          lat: 38.9105033,
          lng: -77.06195
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 14,
        blackboxId: "b14",
        location: {
          lat: 38.91471,
          lng: -77.0671083
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 15,
        blackboxId: "b15",
        location: {
          lat: 38.9081367,
          lng: -77.063705
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 16,
        blackboxId: "b16",
        location: {
          lat: 38.9056967,
          lng: -77.0627317
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 17,
        blackboxId: "b17",
        location: {
          lat: 38.9053501,
          lng: -77.0600664
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 18,
        blackboxId: "b18",
        location: {
          lat: 38.9194386,
          lng: -77.0703986
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 19,
        blackboxId: "b19",
        location: {
          lat: 38.9024299,
          lng: -77.0617611
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 20,
        blackboxId: "b20",
        location: {
          lat: 38.9034027,
          lng: -77.0611405
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 21,
        blackboxId: "b21",
        location: {
          lat: 38.90782,
          lng: -77.0716217
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 22,
        blackboxId: "b22",
        location: {
          lat: 38.9061133,
          lng: -77.0638733
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 23,
        blackboxId: "b23",
        location: {
          lat: 38.9193666,
          lng: -77.0705188
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 24,
        blackboxId: "b24",
        location: {
          lat: 38.902455,
          lng: -77.06018
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 25,
        blackboxId: "b25",
        location: {
          lat: 38.9037201,
          lng: -77.0602856
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 26,
        blackboxId: "b26",
        location: {
          lat: 38.906925,
          lng: -77.0633717
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 27,
        blackboxId: "b27",
        location: {
          lat: 38.9146283,
          lng: -77.0729517
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 28,
        blackboxId: "b28",
        location: {
          lat: 38.9089733,
          lng: -77.0642933
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 29,
        blackboxId: "b29",
        location: {
          lat: 38.9202433,
          lng: -77.0716152
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 30,
        blackboxId: "b30",
        location: {
          lat: 38.9027703,
          lng: -77.0642611
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 31,
        blackboxId: "b31",
        location: {
          lat: 38.9059917,
          lng: -77.0629367
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 32,
        blackboxId: "b32",
        location: {
          lat: 38.9175833,
          lng: -77.0694683
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 33,
        blackboxId: "b33",
        location: {
          lat: 38.9078533,
          lng: -77.0714533
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 34,
        blackboxId: "b34",
        location: {
          lat: 38.9078883,
          lng: -77.0689133
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 35,
        blackboxId: "b35",
        location: {
          lat: 38.91774,
          lng: -77.0697233
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 36,
        blackboxId: "b36",
        location: {
          lat: 38.9052342,
          lng: -77.0600237
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 37,
        blackboxId: "b37",
        location: {
          lat: 38.9081317,
          lng: -77.0637633
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 38,
        blackboxId: "b38",
        location: {
          lat: 38.9024714,
          lng: -77.0604332
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 39,
        blackboxId: "b39",
        location: {
          lat: 38.9019722,
          lng: -77.0599828
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 40,
        blackboxId: "b40",
        location: {
          lat: 38.9118059,
          lng: -77.06658
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 41,
        blackboxId: "b41",
        location: {
          lat: 38.9078044,
          lng: -77.068989
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 42,
        blackboxId: "b42",
        location: {
          lat: 38.9078617,
          lng: -77.0715333
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 43,
        blackboxId: "b43",
        location: {
          lat: 38.9040184,
          lng: -77.062949
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 44,
        blackboxId: "b44",
        location: {
          lat: 38.9125167,
          lng: -77.079725
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 45,
        blackboxId: "b45",
        location: {
          lat: 38.9041083,
          lng: -77.0601667
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 46,
        blackboxId: "b46",
        location: {
          lat: 38.9039133,
          lng: -77.0628217
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 47,
        blackboxId: "b47",
        location: {
          lat: 38.9052095,
          lng: -77.0602633
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 48,
        blackboxId: "b48",
        location: {
          lat: 38.9057233,
          lng: -77.06173
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 49,
        blackboxId: "b49",
        location: {
          lat: 38.902645,
          lng: -77.061735
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 50,
        blackboxId: "b50",
        location: {
          lat: 38.90374,
          lng: -77.0626383
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 51,
        blackboxId: "b51",
        location: {
          lat: 38.9067522,
          lng: -77.0742638
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 52,
        blackboxId: "b52",
        location: {
          lat: 38.920305,
          lng: -77.0716297
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 53,
        blackboxId: "b53",
        location: {
          lat: 38.9024983,
          lng: -77.0603983
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 54,
        blackboxId: "b54",
        location: {
          lat: 38.914685,
          lng: -77.06705
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 55,
        blackboxId: "b55",
        location: {
          lat: 38.9054851,
          lng: -77.0592848
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 56,
        blackboxId: "b56",
        location: {
          lat: 38.904655,
          lng: -77.0627217
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 57,
        blackboxId: "b57",
        location: {
          lat: 38.9039642,
          lng: -77.0651086
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 58,
        blackboxId: "b58",
        location: {
          lat: 38.9202317,
          lng: -77.0717117
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 59,
        blackboxId: "b59",
        location: {
          lat: 38.9103361,
          lng: -77.0647728
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 60,
        blackboxId: "b60",
        location: {
          lat: 38.9051999,
          lng: -77.0603067
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 61,
        blackboxId: "b61",
        location: {
          lat: 38.9055558,
          lng: -77.0626917
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 62,
        blackboxId: "b62",
        location: {
          lat: 38.9077639,
          lng: -77.0689398
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 63,
        blackboxId: "b63",
        location: {
          lat: 38.9081481,
          lng: -77.0637344
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 64,
        blackboxId: "b64",
        location: {
          lat: 38.90756,
          lng: -77.05904
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 65,
        blackboxId: "b65",
        location: {
          lat: 38.9103762,
          lng: -77.0737076
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 66,
        blackboxId: "b66",
        location: {
          lat: 38.9022367,
          lng: -77.0629083
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 67,
        blackboxId: "b67",
        location: {
          lat: 38.9084767,
          lng: -77.0637067
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 68,
        blackboxId: "b68",
        location: {
          lat: 38.9078719,
          lng: -77.0689656
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 69,
        blackboxId: "b69",
        location: {
          lat: 38.9153991,
          lng: -77.0746826
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 70,
        blackboxId: "b70",
        location: {
          lat: 38.9019549,
          lng: -77.0600487
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 71,
        blackboxId: "b71",
        location: {
          lat: 38.9060528,
          lng: -77.0629034
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 72,
        blackboxId: "b72",
        location: {
          lat: 38.9058,
          lng: -77.065015
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 73,
        blackboxId: "b73",
        location: {
          lat: 38.9024233,
          lng: -77.0601667
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 74,
        blackboxId: "b74",
        location: {
          lat: 38.9023806,
          lng: -77.0607523
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 75,
        blackboxId: "b75",
        location: {
          lat: 38.9023241,
          lng: -77.0618745
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 76,
        blackboxId: "b76",
        location: {
          lat: 38.9193617,
          lng: -77.07057
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 77,
        blackboxId: "b77",
        location: {
          lat: 38.9049986,
          lng: -77.0603559
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 78,
        blackboxId: "b78",
        location: {
          lat: 38.9025433,
          lng: -77.0614933
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 79,
        blackboxId: "b79",
        location: {
          lat: 38.9035798,
          lng: -77.0628544
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 80,
        blackboxId: "b80",
        location: {
          lat: 38.9023567,
          lng: -77.0604383
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 81,
        blackboxId: "b81",
        location: {
          lat: 38.91022,
          lng: -77.0647483
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 82,
        blackboxId: "b82",
        location: {
          lat: 38.9052737,
          lng: -77.059571
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 83,
        blackboxId: "b83",
        location: {
          lat: 38.9036671,
          lng: -77.0611174
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 84,
        blackboxId: "b84",
        location: {
          lat: 38.9152767,
          lng: -77.0674933
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 85,
        blackboxId: "b85",
        location: {
          lat: 38.9047963,
          lng: -77.0601488
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 86,
        blackboxId: "b86",
        location: {
          lat: 38.9046909,
          lng: -77.0659793
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 87,
        blackboxId: "b87",
        location: {
          lat: 38.9102552,
          lng: -77.0647408
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 88,
        blackboxId: "b88",
        location: {
          lat: 38.9146417,
          lng: -77.0670084
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 89,
        blackboxId: "b89",
        location: {
          lat: 38.9080463,
          lng: -77.0635454
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 90,
        blackboxId: "b90",
        location: {
          lat: 38.907845,
          lng: -77.0715283
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 91,
        blackboxId: "b91",
        location: {
          lat: 38.90818,
          lng: -77.06378
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 92,
        blackboxId: "b92",
        location: {
          lat: 38.908137,
          lng: -77.063716
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 93,
        blackboxId: "b93",
        location: {
          lat: 38.9145491,
          lng: -77.06707
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 94,
        blackboxId: "b94",
        location: {
          lat: 38.9012189,
          lng: -77.0599266
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 95,
        blackboxId: "b95",
        location: {
          lat: 38.9050801,
          lng: -77.0601434
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 96,
        blackboxId: "b96",
        location: {
          lat: 38.9200833,
          lng: -77.07515
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 97,
        blackboxId: "b97",
        location: {
          lat: 38.9071767,
          lng: -77.07561
        },
        possessionType: "FIELD",
        action: "CHARGE"
      },
      {
        vehicleId: 98,
        blackboxId: "b98",
        location: {
          lat: 38.9202673,
          lng: -77.0717203
        },
        possessionType: "FIELD",
        action: "CHARGEANDRETURN"
      },
      {
        vehicleId: 99,
        blackboxId: "b99",
        location: {
          lat: 38.9022964812267,
          lng: -77.06033523621724
        },
        possessionType: "FIELD",
        action: "CHARGEANDRETURN"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.88092,
          lng: -77.1092817
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 1,
        blackboxId: "b1",
        location: {
          lat: 38.8852083,
          lng: -77.1132833
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 2,
        blackboxId: "b2",
        location: {
          lat: 38.8805941,
          lng: -77.1101817
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 3,
        blackboxId: "b3",
        location: {
          lat: 38.8767504,
          lng: -77.1152825
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 4,
        blackboxId: "b4",
        location: {
          lat: 38.8819616,
          lng: -77.1118998
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 5,
        blackboxId: "b5",
        location: {
          lat: 38.8799804,
          lng: -77.1129097
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 6,
        blackboxId: "b6",
        location: {
          lat: 38.8821367,
          lng: -77.1118863
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 7,
        blackboxId: "b7",
        location: {
          lat: 38.8820234,
          lng: -77.1110024
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 8,
        blackboxId: "b8",
        location: {
          lat: 38.881989,
          lng: -77.1118924
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 9,
        blackboxId: "b9",
        location: {
          lat: 38.8819984,
          lng: -77.1119043
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 10,
        blackboxId: "b10",
        location: {
          lat: 38.8803588,
          lng: -77.1089643
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 11,
        blackboxId: "b11",
        location: {
          lat: 38.8852183,
          lng: -77.1130867
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 12,
        blackboxId: "b12",
        location: {
          lat: 38.8799383,
          lng: -77.1130833
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 13,
        blackboxId: "b13",
        location: {
          lat: 38.8787683,
          lng: -77.1145483
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 14,
        blackboxId: "b14",
        location: {
          lat: 38.8820317,
          lng: -77.1119033
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 15,
        blackboxId: "b15",
        location: {
          lat: 38.8763795,
          lng: -77.1102653
        },
        possessionType: "FIELD",
        action: "RIDE"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.8620867,
          lng: -77.0543317
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 1,
        blackboxId: "b1",
        location: {
          lat: 38.8492817,
          lng: -77.0507383
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 2,
        blackboxId: "b2",
        location: {
          lat: 38.855245,
          lng: -77.05156
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 3,
        blackboxId: "b3",
        location: {
          lat: 38.8585583,
          lng: -77.0592417
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 4,
        blackboxId: "b4",
        location: {
          lat: 38.8524229,
          lng: -77.0605534
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 5,
        blackboxId: "b5",
        location: {
          lat: 38.85346,
          lng: -77.0551583
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 6,
        blackboxId: "b6",
        location: {
          lat: 38.8529867,
          lng: -77.051665
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 7,
        blackboxId: "b7",
        location: {
          lat: 38.8596097,
          lng: -77.0559788
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 8,
        blackboxId: "b8",
        location: {
          lat: 38.8579224,
          lng: -77.0515511
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 9,
        blackboxId: "b9",
        location: {
          lat: 38.8492783,
          lng: -77.0506017
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 10,
        blackboxId: "b10",
        location: {
          lat: 38.8577533,
          lng: -77.05138
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 11,
        blackboxId: "b11",
        location: {
          lat: 38.85988,
          lng: -77.0527683
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 12,
        blackboxId: "b12",
        location: {
          lat: 38.862735,
          lng: -77.05906
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 13,
        blackboxId: "b13",
        location: {
          lat: 38.8498683,
          lng: -77.0507917
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 14,
        blackboxId: "b14",
        location: {
          lat: 38.8492739,
          lng: -77.0506093
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 15,
        blackboxId: "b15",
        location: {
          lat: 38.8534231,
          lng: -77.0591655
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 16,
        blackboxId: "b16",
        location: {
          lat: 38.8619567,
          lng: -77.0593717
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 17,
        blackboxId: "b17",
        location: {
          lat: 38.8621583,
          lng: -77.0627159
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 18,
        blackboxId: "b18",
        location: {
          lat: 38.862095,
          lng: -77.0599983
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 19,
        blackboxId: "b19",
        location: {
          lat: 38.8530764,
          lng: -77.0552205
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 20,
        blackboxId: "b20",
        location: {
          lat: 38.849954,
          lng: -77.0507262
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 21,
        blackboxId: "b21",
        location: {
          lat: 38.8634944,
          lng: -77.0633899
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 22,
        blackboxId: "b22",
        location: {
          lat: 38.85753,
          lng: -77.05145
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 23,
        blackboxId: "b23",
        location: {
          lat: 38.8568364,
          lng: -77.0492592
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 24,
        blackboxId: "b24",
        location: {
          lat: 38.8530255,
          lng: -77.0500356
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 25,
        blackboxId: "b25",
        location: {
          lat: 38.8623417,
          lng: -77.049295
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 26,
        blackboxId: "b26",
        location: {
          lat: 38.8544183,
          lng: -77.0525617
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 27,
        blackboxId: "b27",
        location: {
          lat: 38.8634486,
          lng: -77.0633423
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 28,
        blackboxId: "b28",
        location: {
          lat: 38.8593499,
          lng: -77.0552718
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 29,
        blackboxId: "b29",
        location: {
          lat: 38.8635301,
          lng: -77.0633373
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 30,
        blackboxId: "b30",
        location: {
          lat: 38.8531564,
          lng: -77.0498728
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 31,
        blackboxId: "b31",
        location: {
          lat: 38.8622883,
          lng: -77.0487883
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 32,
        blackboxId: "b32",
        location: {
          lat: 38.8623917,
          lng: -77.0554033
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 33,
        blackboxId: "b33",
        location: {
          lat: 38.8619983,
          lng: -77.05934
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 34,
        blackboxId: "b34",
        location: {
          lat: 38.8577333,
          lng: -77.0513317
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 35,
        blackboxId: "b35",
        location: {
          lat: 38.8598983,
          lng: -77.05286
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 36,
        blackboxId: "b36",
        location: {
          lat: 38.85726,
          lng: -77.0528233
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 37,
        blackboxId: "b37",
        location: {
          lat: 38.8600267,
          lng: -77.05261
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 38,
        blackboxId: "b38",
        location: {
          lat: 38.8597196,
          lng: -77.0534938
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 39,
        blackboxId: "b39",
        location: {
          lat: 38.85868,
          lng: -77.05328
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 40,
        blackboxId: "b40",
        location: {
          lat: 38.8601533,
          lng: -77.0513367
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 41,
        blackboxId: "b41",
        location: {
          lat: 38.8575525,
          lng: -77.0515899
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 42,
        blackboxId: "b42",
        location: {
          lat: 38.8620033,
          lng: -77.0595083
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 43,
        blackboxId: "b43",
        location: {
          lat: 38.8625398,
          lng: -77.0495184
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 44,
        blackboxId: "b44",
        location: {
          lat: 38.8528617,
          lng: -77.0519532
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 45,
        blackboxId: "b45",
        location: {
          lat: 38.8618617,
          lng: -77.0598067
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 46,
        blackboxId: "b46",
        location: {
          lat: 38.862645,
          lng: -77.0557
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 47,
        blackboxId: "b47",
        location: {
          lat: 38.8626111,
          lng: -77.0564722
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 48,
        blackboxId: "b48",
        location: {
          lat: 38.8594767,
          lng: -77.0558483
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 49,
        blackboxId: "b49",
        location: {
          lat: 38.8622167,
          lng: -77.0488817
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 50,
        blackboxId: "b50",
        location: {
          lat: 38.8483485,
          lng: -77.0513025
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 51,
        blackboxId: "b51",
        location: {
          lat: 38.86254,
          lng: -77.05654
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 52,
        blackboxId: "b52",
        location: {
          lat: 38.8574767,
          lng: -77.0513967
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 53,
        blackboxId: "b53",
        location: {
          lat: 38.8533332,
          lng: -77.0551178
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 54,
        blackboxId: "b54",
        location: {
          lat: 38.8532783,
          lng: -77.052755
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 55,
        blackboxId: "b55",
        location: {
          lat: 38.8596867,
          lng: -77.0527333
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 56,
        blackboxId: "b56",
        location: {
          lat: 38.8533844,
          lng: -77.0551171
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 57,
        blackboxId: "b57",
        location: {
          lat: 38.8620566,
          lng: -77.0546884
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 58,
        blackboxId: "b58",
        location: {
          lat: 38.8611572,
          lng: -77.055601
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 59,
        blackboxId: "b59",
        location: {
          lat: 38.8604333,
          lng: -77.0529983
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 60,
        blackboxId: "b60",
        location: {
          lat: 38.8531267,
          lng: -77.0498883
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 61,
        blackboxId: "b61",
        location: {
          lat: 38.8589558,
          lng: -77.0560797
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 62,
        blackboxId: "b62",
        location: {
          lat: 38.8600221,
          lng: -77.0504372
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 63,
        blackboxId: "b63",
        location: {
          lat: 38.8494017,
          lng: -77.0505033
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 64,
        blackboxId: "b64",
        location: {
          lat: 38.8533283,
          lng: -77.05283
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 65,
        blackboxId: "b65",
        location: {
          lat: 38.8576967,
          lng: -77.0515433
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 66,
        blackboxId: "b66",
        location: {
          lat: 38.8591183,
          lng: -77.0597232
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 67,
        blackboxId: "b67",
        location: {
          lat: 38.8634967,
          lng: -77.0633367
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 68,
        blackboxId: "b68",
        location: {
          lat: 38.865505,
          lng: -77.0498333
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 69,
        blackboxId: "b69",
        location: {
          lat: 38.8574396,
          lng: -77.0529115
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 70,
        blackboxId: "b70",
        location: {
          lat: 38.8572083,
          lng: -77.05084
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 71,
        blackboxId: "b71",
        location: {
          lat: 38.8535167,
          lng: -77.049075
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 72,
        blackboxId: "b72",
        location: {
          lat: 38.8532384,
          lng: -77.0527745
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 73,
        blackboxId: "b73",
        location: {
          lat: 38.8613483,
          lng: -77.0530033
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 74,
        blackboxId: "b74",
        location: {
          lat: 38.86031,
          lng: -77.05629
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 75,
        blackboxId: "b75",
        location: {
          lat: 38.86212,
          lng: -77.0600083
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 76,
        blackboxId: "b76",
        location: {
          lat: 38.8601017,
          lng: -77.05297
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 77,
        blackboxId: "b77",
        location: {
          lat: 38.8534533,
          lng: -77.0495966
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 78,
        blackboxId: "b78",
        location: {
          lat: 38.8587834,
          lng: -77.0491065
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 79,
        blackboxId: "b79",
        location: {
          lat: 38.8532549,
          lng: -77.0499229
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 80,
        blackboxId: "b80",
        location: {
          lat: 38.8598017,
          lng: -77.0526935
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 81,
        blackboxId: "b81",
        location: {
          lat: 38.8598763,
          lng: -77.0529166
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 82,
        blackboxId: "b82",
        location: {
          lat: 38.8620183,
          lng: -77.0505117
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 83,
        blackboxId: "b83",
        location: {
          lat: 38.8535117,
          lng: -77.0561633
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 84,
        blackboxId: "b84",
        location: {
          lat: 38.8534251,
          lng: -77.049555
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 85,
        blackboxId: "b85",
        location: {
          lat: 38.86458,
          lng: -77.063745
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 86,
        blackboxId: "b86",
        location: {
          lat: 38.8619734,
          lng: -77.0596388
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 87,
        blackboxId: "b87",
        location: {
          lat: 38.850705,
          lng: -77.05162
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 88,
        blackboxId: "b88",
        location: {
          lat: 38.8598833,
          lng: -77.0527
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 89,
        blackboxId: "b89",
        location: {
          lat: 38.8598683,
          lng: -77.0512133
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 90,
        blackboxId: "b90",
        location: {
          lat: 38.863265,
          lng: -77.06332
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 91,
        blackboxId: "b91",
        location: {
          lat: 38.8598033,
          lng: -77.0527358
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 92,
        blackboxId: "b92",
        location: {
          lat: 38.8599793,
          lng: -77.0528446
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 93,
        blackboxId: "b93",
        location: {
          lat: 38.85962,
          lng: -77.0535717
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 94,
        blackboxId: "b94",
        location: {
          lat: 38.8505374,
          lng: -77.0515667
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 95,
        blackboxId: "b95",
        location: {
          lat: 38.858185,
          lng: -77.0532667
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 96,
        blackboxId: "b96",
        location: {
          lat: 38.8630417,
          lng: -77.059225
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 97,
        blackboxId: "b97",
        location: {
          lat: 38.859785,
          lng: -77.05356
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 98,
        blackboxId: "b98",
        location: {
          lat: 38.8631733,
          lng: -77.05475
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 99,
        blackboxId: "b99",
        location: {
          lat: 38.853295,
          lng: -77.0528217
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 100,
        blackboxId: "b100",
        location: {
          lat: 38.8495617,
          lng: -77.0589917
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 101,
        blackboxId: "b101",
        location: {
          lat: 38.8552218,
          lng: -77.0518086
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 102,
        blackboxId: "b102",
        location: {
          lat: 38.8619917,
          lng: -77.060035
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 103,
        blackboxId: "b103",
        location: {
          lat: 38.8582917,
          lng: -77.0532367
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 104,
        blackboxId: "b104",
        location: {
          lat: 38.8628617,
          lng: -77.0545533
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 105,
        blackboxId: "b105",
        location: {
          lat: 38.8559869,
          lng: -77.0491792
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 106,
        blackboxId: "b106",
        location: {
          lat: 38.8507932,
          lng: -77.0513514
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 107,
        blackboxId: "b107",
        location: {
          lat: 38.8485767,
          lng: -77.05176
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 108,
        blackboxId: "b108",
        location: {
          lat: 38.8576133,
          lng: -77.0514817
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 109,
        blackboxId: "b109",
        location: {
          lat: 38.8610967,
          lng: -77.0557299
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 110,
        blackboxId: "b110",
        location: {
          lat: 38.8534017,
          lng: -77.0551133
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 111,
        blackboxId: "b111",
        location: {
          lat: 38.8625599,
          lng: -77.0594015
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 112,
        blackboxId: "b112",
        location: {
          lat: 38.8635533,
          lng: -77.06341
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 113,
        blackboxId: "b113",
        location: {
          lat: 38.8527653,
          lng: -77.0520941
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 114,
        blackboxId: "b114",
        location: {
          lat: 38.853425,
          lng: -77.0495883
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 115,
        blackboxId: "b115",
        location: {
          lat: 38.849875,
          lng: -77.0504517
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 116,
        blackboxId: "b116",
        location: {
          lat: 38.8627732,
          lng: -77.0636947
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 117,
        blackboxId: "b117",
        location: {
          lat: 38.8506733,
          lng: -77.0515333
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 118,
        blackboxId: "b118",
        location: {
          lat: 38.8527167,
          lng: -77.0521166
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 119,
        blackboxId: "b119",
        location: {
          lat: 38.8553458,
          lng: -77.0517802
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 120,
        blackboxId: "b120",
        location: {
          lat: 38.8556633,
          lng: -77.0494517
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 121,
        blackboxId: "b121",
        location: {
          lat: 38.8499123,
          lng: -77.050743
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 122,
        blackboxId: "b122",
        location: {
          lat: 38.8555585,
          lng: -77.04965
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 123,
        blackboxId: "b123",
        location: {
          lat: 38.86121,
          lng: -77.0530967
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 124,
        blackboxId: "b124",
        location: {
          lat: 38.8527483,
          lng: -77.0520417
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 125,
        blackboxId: "b125",
        location: {
          lat: 38.8623067,
          lng: -77.0592517
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 126,
        blackboxId: "b126",
        location: {
          lat: 38.8506033,
          lng: -77.0516667
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 127,
        blackboxId: "b127",
        location: {
          lat: 38.8534717,
          lng: -77.0493576
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 128,
        blackboxId: "b128",
        location: {
          lat: 38.849845,
          lng: -77.05046
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 129,
        blackboxId: "b129",
        location: {
          lat: 38.8525117,
          lng: -77.06034
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 130,
        blackboxId: "b130",
        location: {
          lat: 38.8627583,
          lng: -77.05559
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 131,
        blackboxId: "b131",
        location: {
          lat: 38.853738,
          lng: -77.0494205
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 132,
        blackboxId: "b132",
        location: {
          lat: 38.850025,
          lng: -77.05076
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 133,
        blackboxId: "b133",
        location: {
          lat: 38.86269,
          lng: -77.0598067
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 134,
        blackboxId: "b134",
        location: {
          lat: 38.86224,
          lng: -77.0488967
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 135,
        blackboxId: "b135",
        location: {
          lat: 38.8546,
          lng: -77.055465
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 136,
        blackboxId: "b136",
        location: {
          lat: 38.84915,
          lng: -77.0505933
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 137,
        blackboxId: "b137",
        location: {
          lat: 38.859985,
          lng: -77.0527667
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 138,
        blackboxId: "b138",
        location: {
          lat: 38.8600459,
          lng: -77.0527451
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 139,
        blackboxId: "b139",
        location: {
          lat: 38.86329,
          lng: -77.0632817
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 140,
        blackboxId: "b140",
        location: {
          lat: 38.8622767,
          lng: -77.048815
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 141,
        blackboxId: "b141",
        location: {
          lat: 38.86339,
          lng: -77.0632583
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 142,
        blackboxId: "b142",
        location: {
          lat: 38.8498533,
          lng: -77.0505867
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 143,
        blackboxId: "b143",
        location: {
          lat: 38.8585733,
          lng: -77.0592183
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 144,
        blackboxId: "b144",
        location: {
          lat: 38.8635033,
          lng: -77.063375
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 145,
        blackboxId: "b145",
        location: {
          lat: 38.8629058,
          lng: -77.0543276
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 146,
        blackboxId: "b146",
        location: {
          lat: 38.8595967,
          lng: -77.055785
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 147,
        blackboxId: "b147",
        location: {
          lat: 38.8614356,
          lng: -77.0507217
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 148,
        blackboxId: "b148",
        location: {
          lat: 38.8599067,
          lng: -77.0526233
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 149,
        blackboxId: "b149",
        location: {
          lat: 38.8584332,
          lng: -77.053129
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 150,
        blackboxId: "b150",
        location: {
          lat: 38.8527173,
          lng: -77.0522006
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 151,
        blackboxId: "b151",
        location: {
          lat: 38.8552283,
          lng: -77.05167
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 152,
        blackboxId: "b152",
        location: {
          lat: 38.8628033,
          lng: -77.059835
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 153,
        blackboxId: "b153",
        location: {
          lat: 38.8573683,
          lng: -77.05152
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 154,
        blackboxId: "b154",
        location: {
          lat: 38.8553467,
          lng: -77.0518467
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 155,
        blackboxId: "b155",
        location: {
          lat: 38.85846,
          lng: -77.0592717
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 156,
        blackboxId: "b156",
        location: {
          lat: 38.8540949,
          lng: -77.0496614
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 157,
        blackboxId: "b157",
        location: {
          lat: 38.8530776,
          lng: -77.0501003
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 158,
        blackboxId: "b158",
        location: {
          lat: 38.8633807,
          lng: -77.0632897
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 159,
        blackboxId: "b159",
        location: {
          lat: 38.8572633,
          lng: -77.0529383
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 160,
        blackboxId: "b160",
        location: {
          lat: 38.8633683,
          lng: -77.0633267
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 161,
        blackboxId: "b161",
        location: {
          lat: 38.8541294,
          lng: -77.056595
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 162,
        blackboxId: "b162",
        location: {
          lat: 38.8572471,
          lng: -77.0528356
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 163,
        blackboxId: "b163",
        location: {
          lat: 38.8549996,
          lng: -77.0555468
        },
        possessionType: "FIELD",
        action: "GROUNDED"
      },
      {
        vehicleId: 164,
        blackboxId: "b164",
        location: {
          lat: 38.8529033,
          lng: -77.0519233
        },
        possessionType: "FIELD",
        action: "CHARGE"
      },
      {
        vehicleId: 165,
        blackboxId: "b165",
        location: {
          lat: 38.8597141,
          lng: -77.0536585
        },
        possessionType: "FIELD",
        action: "CHARGE"
      },
      {
        vehicleId: 166,
        blackboxId: "b166",
        location: {
          lat: 38.8641619,
          lng: -77.0635032
        },
        possessionType: "FIELD",
        action: "CHARGE"
      },
      {
        vehicleId: 167,
        blackboxId: "b167",
        location: {
          lat: 38.8570448,
          lng: -77.0528785
        },
        possessionType: "FIELD",
        action: "CHARGE"
      },
      {
        vehicleId: 168,
        blackboxId: "b168",
        location: {
          lat: 38.8517483,
          lng: -77.0513217
        },
        possessionType: "FIELD",
        action: "CHARGE"
      },
      {
        vehicleId: 169,
        blackboxId: "b169",
        location: {
          lat: 38.8518389,
          lng: -77.0515195
        },
        possessionType: "FIELD",
        action: "CHARGE"
      },
      {
        vehicleId: 170,
        blackboxId: "b170",
        location: {
          lat: 38.8643072,
          lng: -77.0635425
        },
        possessionType: "FIELD",
        action: "CHARGE"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.8652783,
          lng: -77.0767468
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 1,
        blackboxId: "b1",
        location: {
          lat: 38.8605881,
          lng: -77.0940933
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 2,
        blackboxId: "b2",
        location: {
          lat: 38.8624583,
          lng: -77.0776041
        },
        possessionType: "FIELD",
        action: "RIDE"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.8196598,
          lng: -77.0575274
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 1,
        blackboxId: "b1",
        location: {
          lat: 38.832395,
          lng: -77.04992
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 2,
        blackboxId: "b2",
        location: {
          lat: 38.83399,
          lng: -77.0499717
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 3,
        blackboxId: "b3",
        location: {
          lat: 38.8147083,
          lng: -77.03962
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 4,
        blackboxId: "b4",
        location: {
          lat: 38.8335217,
          lng: -77.055355
        },
        possessionType: "FIELD",
        action: "RIDE"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.8453682,
          lng: -77.0643717
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 1,
        blackboxId: "b1",
        location: {
          lat: 38.8378217,
          lng: -77.0517116
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 2,
        blackboxId: "b2",
        location: {
          lat: 38.8428417,
          lng: -77.0512383
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 3,
        blackboxId: "b3",
        location: {
          lat: 38.842835,
          lng: -77.0511783
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 4,
        blackboxId: "b4",
        location: {
          lat: 38.8429115,
          lng: -77.0511128
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 5,
        blackboxId: "b5",
        location: {
          lat: 38.8372058,
          lng: -77.0482804
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 6,
        blackboxId: "b6",
        location: {
          lat: 38.8429167,
          lng: -77.0512167
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 7,
        blackboxId: "b7",
        location: {
          lat: 38.8428217,
          lng: -77.0515817
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 8,
        blackboxId: "b8",
        location: {
          lat: 38.8428317,
          lng: -77.0512683
        },
        possessionType: "FIELD",
        action: "RIDE"
      },
      {
        vehicleId: 9,
        blackboxId: "b9",
        location: {
          lat: 38.8428908,
          lng: -77.0510782
        },
        possessionType: "FIELD",
        action: "RIDE"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.8597232,
          lng: -76.9933984
        },
        possessionType: "FIELD",
        action: "RIDE"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.8755057,
          lng: -77.2345974
        },
        possessionType: "FIELD",
        action: "PROCESS"
      },
      {
        vehicleId: 1,
        blackboxId: "b1",
        location: {
          lat: 38.8754997,
          lng: -77.2344968
        },
        possessionType: "FIELD",
        action: "PROCESS"
      },
      {
        vehicleId: 2,
        blackboxId: "b2",
        location: {
          lat: 38.8755528,
          lng: -77.2343434
        },
        possessionType: "FIELD",
        action: "PROCESS"
      },
      {
        vehicleId: 3,
        blackboxId: "b3",
        location: {
          lat: 38.8756607,
          lng: -77.2347845
        },
        possessionType: "FIELD",
        action: "PROCESS"
      },
      {
        vehicleId: 4,
        blackboxId: "b4",
        location: {
          lat: 38.8753783,
          lng: -77.2345577
        },
        possessionType: "FIELD",
        action: "PROCESS"
      },
      {
        vehicleId: 5,
        blackboxId: "b5",
        location: {
          lat: 38.8753115,
          lng: -77.2343717
        },
        possessionType: "FIELD",
        action: "PROCESS"
      },
      {
        vehicleId: 6,
        blackboxId: "b6",
        location: {
          lat: 38.8753467,
          lng: -77.2345783
        },
        possessionType: "FIELD",
        action: "GROUNDED"
      },
      {
        vehicleId: 7,
        blackboxId: "b7",
        location: {
          lat: 38.8753704,
          lng: -77.2346097
        },
        possessionType: "FIELD",
        action: "GROUNDED"
      },
      {
        vehicleId: 8,
        blackboxId: "b8",
        location: {
          lat: 38.8753365,
          lng: -77.2344248
        },
        possessionType: "FIELD",
        action: "GROUNDED"
      },
      {
        vehicleId: 9,
        blackboxId: "b9",
        location: {
          lat: 38.8753214,
          lng: -77.2344044
        },
        possessionType: "FIELD",
        action: "GROUNDED"
      },
      {
        vehicleId: 10,
        blackboxId: "b10",
        location: {
          lat: 38.8753894,
          lng: -77.2344386
        },
        possessionType: "FIELD",
        action: "GROUNDED"
      },
      {
        vehicleId: 11,
        blackboxId: "b11",
        location: {
          lat: 38.87542,
          lng: -77.2345206
        },
        possessionType: "FIELD",
        action: "GROUNDED"
      },
      {
        vehicleId: 12,
        blackboxId: "b12",
        location: {
          lat: 38.8755442,
          lng: -77.2350194
        },
        possessionType: "FIELD",
        action: "GROUNDED"
      },
      {
        vehicleId: 13,
        blackboxId: "b13",
        location: {
          lat: 38.8753996,
          lng: -77.2346977
        },
        possessionType: "FIELD",
        action: "GROUNDED"
      },
      {
        vehicleId: 14,
        blackboxId: "b14",
        location: {
          lat: 38.875554,
          lng: -77.2344441
        },
        possessionType: "FIELD",
        action: "GROUNDED"
      },
      {
        vehicleId: 15,
        blackboxId: "b15",
        location: {
          lat: 38.8754437,
          lng: -77.2345483
        },
        possessionType: "FIELD",
        action: "GROUNDED"
      },
      {
        vehicleId: 16,
        blackboxId: "b16",
        location: {
          lat: 38.875315,
          lng: -77.23416
        },
        possessionType: "FIELD",
        action: "GROUNDED"
      },
      {
        vehicleId: 17,
        blackboxId: "b17",
        location: {
          lat: 38.8753675,
          lng: -77.234391
        },
        possessionType: "FIELD",
        action: "GROUNDED"
      },
      {
        vehicleId: 18,
        blackboxId: "b18",
        location: {
          lat: 38.8752532,
          lng: -77.2344837
        },
        possessionType: "FIELD",
        action: "GROUNDED"
      },
      {
        vehicleId: 19,
        blackboxId: "b19",
        location: {
          lat: 38.8753633,
          lng: -77.2343817
        },
        possessionType: "FIELD",
        action: "CHARGEANDRETURN"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.80015088297708,
          lng: -77.0411232053989
        },
        possessionType: "FIELD",
        action: "GROUNDED"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.8995633,
          lng: -76.926345
        },
        possessionType: "FIELD",
        action: "CHARGE"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.8994521,
          lng: -76.8764226
        },
        possessionType: "FIELD",
        action: "CHARGE"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.956571,
          lng: -77.0100404
        },
        possessionType: "FIELD",
        action: "CHARGE"
      },
      {
        vehicleId: 1,
        blackboxId: "b1",
        location: {
          lat: 38.9568031,
          lng: -77.0105165
        },
        possessionType: "FIELD",
        action: "CHARGE"
      },
      {
        vehicleId: 2,
        blackboxId: "b2",
        location: {
          lat: 38.9555357,
          lng: -76.9962534
        },
        possessionType: "FIELD",
        action: "CHARGEANDRETURN"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.948827,
          lng: -77.066422
        },
        possessionType: "FIELD",
        action: "CHARGE"
      },
      {
        vehicleId: 1,
        blackboxId: "b1",
        location: {
          lat: 38.96176,
          lng: -77.0873267
        },
        possessionType: "FIELD",
        action: "CHARGE"
      },
      {
        vehicleId: 2,
        blackboxId: "b2",
        location: {
          lat: 38.9392683,
          lng: -77.0847533
        },
        possessionType: "FIELD",
        action: "CHARGE"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.9235137,
          lng: -77.0951292
        },
        possessionType: "FIELD",
        action: "CHARGE"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 39.0326558,
          lng: -77.0419461
        },
        possessionType: "FIELD",
        action: "CHARGEANDRETURN"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.9573053,
          lng: -77.2088028
        },
        possessionType: "FIELD",
        action: "CHARGEANDRETURN"
      },
      {
        vehicleId: 1,
        blackboxId: "b1",
        location: {
          lat: 38.9572893,
          lng: -77.2088084
        },
        possessionType: "FIELD",
        action: "CHARGEANDRETURN"
      },
      {
        vehicleId: 2,
        blackboxId: "b2",
        location: {
          lat: 38.9572526,
          lng: -77.2088388
        },
        possessionType: "FIELD",
        action: "CHARGEANDRETURN"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.7641395,
          lng: -77.0911607
        },
        possessionType: "FIELD",
        action: "CHARGEANDRETURN"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.8790306,
          lng: -77.0143699
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 1,
        blackboxId: "b1",
        location: {
          lat: 38.8788894,
          lng: -77.0143424
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 2,
        blackboxId: "b2",
        location: {
          lat: 38.8949281,
          lng: -77.0228951
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 3,
        blackboxId: "b3",
        location: {
          lat: 38.8953189,
          lng: -77.0228016
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 4,
        blackboxId: "b4",
        location: {
          lat: 38.8949164,
          lng: -77.0228914
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 5,
        blackboxId: "b5",
        location: {
          lat: 38.8790433,
          lng: -77.0141738
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 6,
        blackboxId: "b6",
        location: {
          lat: 38.8949378,
          lng: -77.0228908
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 7,
        blackboxId: "b7",
        location: {
          lat: 38.8949384,
          lng: -77.0228909
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 8,
        blackboxId: "b8",
        location: {
          lat: 38.8789494,
          lng: -77.0140768
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 9,
        blackboxId: "b9",
        location: {
          lat: 38.8949573,
          lng: -77.0224417
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 10,
        blackboxId: "b10",
        location: {
          lat: 38.8790333,
          lng: -77.0143565
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 11,
        blackboxId: "b11",
        location: {
          lat: 38.8949386,
          lng: -77.0228917
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 12,
        blackboxId: "b12",
        location: {
          lat: 38.8949382,
          lng: -77.0228913
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 13,
        blackboxId: "b13",
        location: {
          lat: 38.8787896,
          lng: -77.0142732
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 14,
        blackboxId: "b14",
        location: {
          lat: 38.87904,
          lng: -77.0142717
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 15,
        blackboxId: "b15",
        location: {
          lat: 38.8949364,
          lng: -77.0229005
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 16,
        blackboxId: "b16",
        location: {
          lat: 38.8949383,
          lng: -77.0228914
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 17,
        blackboxId: "b17",
        location: {
          lat: 38.8949382,
          lng: -77.0228914
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 18,
        blackboxId: "b18",
        location: {
          lat: 38.8788427,
          lng: -77.0143335
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 19,
        blackboxId: "b19",
        location: {
          lat: 38.8788333,
          lng: -77.01415
        },
        possessionType: "RANGER",
        action: "CHARGEANDRETURN"
      },
      {
        vehicleId: 20,
        blackboxId: "b20",
        location: {
          lat: 38.8788079,
          lng: -77.0143105
        },
        possessionType: "RANGER",
        action: "CHARGEANDRETURN"
      },
      {
        vehicleId: 21,
        blackboxId: "b21",
        location: {
          lat: 38.8788121,
          lng: -77.0003978
        },
        possessionType: "RANGER",
        action: "CHARGEANDRETURN"
      },
      {
        vehicleId: 22,
        blackboxId: "b22",
        location: {
          lat: 38.8789115,
          lng: -77.0142147
        },
        possessionType: "RANGER",
        action: "CHARGEANDRETURN"
      },
      {
        vehicleId: 23,
        blackboxId: "b23",
        location: {
          lat: 38.8790552,
          lng: -77.0139454
        },
        possessionType: "RANGER",
        action: "CHARGEANDRETURN"
      },
      {
        vehicleId: 24,
        blackboxId: "b24",
        location: {
          lat: 38.8787876,
          lng: -77.0142621
        },
        possessionType: "RANGER",
        action: "CHARGEANDRETURN"
      },
      {
        vehicleId: 25,
        blackboxId: "b25",
        location: {
          lat: 38.878854028916805,
          lng: -77.0142961946102
        },
        possessionType: "RANGER",
        action: "CHARGEANDRETURN"
      },
      {
        vehicleId: 26,
        blackboxId: "b26",
        location: {
          lat: 38.878814,
          lng: -77.0004354
        },
        possessionType: "RANGER",
        action: "CHARGEANDRETURN"
      },
      {
        vehicleId: 27,
        blackboxId: "b27",
        location: {
          lat: 38.89371422123061,
          lng: -77.02260810889027
        },
        possessionType: "RANGER",
        action: "CHARGEANDRETURN"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.9541489,
          lng: -76.9217322
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 1,
        blackboxId: "b1",
        location: {
          lat: 38.9541709,
          lng: -76.9217563
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 2,
        blackboxId: "b2",
        location: {
          lat: 38.95432,
          lng: -76.9217217
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 3,
        blackboxId: "b3",
        location: {
          lat: 38.9542318,
          lng: -76.9217502
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 4,
        blackboxId: "b4",
        location: {
          lat: 38.9541316,
          lng: -76.9217098
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 5,
        blackboxId: "b5",
        location: {
          lat: 38.9542099,
          lng: -76.9217113
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 6,
        blackboxId: "b6",
        location: {
          lat: 38.9541727,
          lng: -76.921809
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 7,
        blackboxId: "b7",
        location: {
          lat: 38.9541548,
          lng: -76.9217707
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 8,
        blackboxId: "b8",
        location: {
          lat: 38.9541051,
          lng: -76.9217696
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 9,
        blackboxId: "b9",
        location: {
          lat: 38.9541033,
          lng: -76.9217133
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 10,
        blackboxId: "b10",
        location: {
          lat: 38.9541541,
          lng: -76.9217939
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 11,
        blackboxId: "b11",
        location: {
          lat: 38.9541547,
          lng: -76.9217698
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 12,
        blackboxId: "b12",
        location: {
          lat: 38.9541148,
          lng: -76.9215944
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 13,
        blackboxId: "b13",
        location: {
          lat: 38.9541782,
          lng: -76.9218591
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 14,
        blackboxId: "b14",
        location: {
          lat: 38.954255,
          lng: -76.9216983
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 15,
        blackboxId: "b15",
        location: {
          lat: 38.9542341,
          lng: -76.9217412
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 16,
        blackboxId: "b16",
        location: {
          lat: 38.9542497,
          lng: -76.9217444
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 17,
        blackboxId: "b17",
        location: {
          lat: 38.9542034,
          lng: -76.9216874
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 18,
        blackboxId: "b18",
        location: {
          lat: 38.9542333,
          lng: -76.92165
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 19,
        blackboxId: "b19",
        location: {
          lat: 38.9541798,
          lng: -76.9217308
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 20,
        blackboxId: "b20",
        location: {
          lat: 38.9540965,
          lng: -76.9216818
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 21,
        blackboxId: "b21",
        location: {
          lat: 38.9541418,
          lng: -76.9217383
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 22,
        blackboxId: "b22",
        location: {
          lat: 38.9542343,
          lng: -76.9217014
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 23,
        blackboxId: "b23",
        location: {
          lat: 38.9541932,
          lng: -76.9217328
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 24,
        blackboxId: "b24",
        location: {
          lat: 38.9542103,
          lng: -76.921693
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 25,
        blackboxId: "b25",
        location: {
          lat: 38.9542403,
          lng: -76.9216304
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 26,
        blackboxId: "b26",
        location: {
          lat: 38.9540925,
          lng: -76.9217116
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 27,
        blackboxId: "b27",
        location: {
          lat: 38.9541584,
          lng: -76.9217825
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 28,
        blackboxId: "b28",
        location: {
          lat: 38.95414,
          lng: -76.92172
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 29,
        blackboxId: "b29",
        location: {
          lat: 38.9541886,
          lng: -76.9217767
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 30,
        blackboxId: "b30",
        location: {
          lat: 38.9542473,
          lng: -76.9217366
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 31,
        blackboxId: "b31",
        location: {
          lat: 38.9541767,
          lng: -76.9217833
        },
        possessionType: "RANGER",
        action: "CHARGE"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.9419414,
          lng: -77.0264004
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 1,
        blackboxId: "b1",
        location: {
          lat: 38.9419414,
          lng: -77.0264004
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 2,
        blackboxId: "b2",
        location: {
          lat: 38.9419414,
          lng: -77.0264004
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 3,
        blackboxId: "b3",
        location: {
          lat: 38.9419414,
          lng: -77.0264004
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 4,
        blackboxId: "b4",
        location: {
          lat: 38.9419414,
          lng: -77.0264004
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 5,
        blackboxId: "b5",
        location: {
          lat: 38.9419414,
          lng: -77.0264004
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 6,
        blackboxId: "b6",
        location: {
          lat: 38.9419414,
          lng: -77.0264004
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 7,
        blackboxId: "b7",
        location: {
          lat: 38.9419414,
          lng: -77.0264004
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 8,
        blackboxId: "b8",
        location: {
          lat: 38.9419414,
          lng: -77.0264004
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 9,
        blackboxId: "b9",
        location: {
          lat: 38.9419414,
          lng: -77.0264004
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 10,
        blackboxId: "b10",
        location: {
          lat: 38.9419414,
          lng: -77.0264004
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 11,
        blackboxId: "b11",
        location: {
          lat: 38.9419414,
          lng: -77.0264004
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 12,
        blackboxId: "b12",
        location: {
          lat: 38.942583,
          lng: -77.0264004
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 13,
        blackboxId: "b13",
        location: {
          lat: 38.9419414,
          lng: -77.0264004
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 14,
        blackboxId: "b14",
        location: {
          lat: 38.9419414,
          lng: -77.0264004
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 15,
        blackboxId: "b15",
        location: {
          lat: 38.9419423,
          lng: -77.0264
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 16,
        blackboxId: "b16",
        location: {
          lat: 38.942583,
          lng: -77.0264004
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 17,
        blackboxId: "b17",
        location: {
          lat: 38.9419414,
          lng: -77.0264004
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 18,
        blackboxId: "b18",
        location: {
          lat: 38.9419414,
          lng: -77.0264004
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 19,
        blackboxId: "b19",
        location: {
          lat: 38.9419414,
          lng: -77.0264004
        },
        possessionType: "RANGER",
        action: "CHARGE"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.8984264,
          lng: -76.980857
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 1,
        blackboxId: "b1",
        location: {
          lat: 38.898424,
          lng: -76.9808454
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 2,
        blackboxId: "b2",
        location: {
          lat: 38.8984012,
          lng: -76.9808453
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 3,
        blackboxId: "b3",
        location: {
          lat: 38.8984544,
          lng: -76.9808663
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 4,
        blackboxId: "b4",
        location: {
          lat: 38.8984007,
          lng: -76.9808315
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 5,
        blackboxId: "b5",
        location: {
          lat: 38.8984199,
          lng: -76.9808597
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 6,
        blackboxId: "b6",
        location: {
          lat: 38.8984202,
          lng: -76.9808323
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 7,
        blackboxId: "b7",
        location: {
          lat: 38.8985717,
          lng: -76.9807717
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 8,
        blackboxId: "b8",
        location: {
          lat: 38.8984435,
          lng: -76.9808626
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 9,
        blackboxId: "b9",
        location: {
          lat: 38.8986283,
          lng: -76.98075
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 10,
        blackboxId: "b10",
        location: {
          lat: 38.8986084,
          lng: -76.9808264
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 11,
        blackboxId: "b11",
        location: {
          lat: 38.8986317,
          lng: -76.9808083
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 12,
        blackboxId: "b12",
        location: {
          lat: 38.8984435,
          lng: -76.9808587
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 13,
        blackboxId: "b13",
        location: {
          lat: 38.8984006,
          lng: -76.9808307
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 14,
        blackboxId: "b14",
        location: {
          lat: 38.898428,
          lng: -76.9808541
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 15,
        blackboxId: "b15",
        location: {
          lat: 38.8984202,
          lng: -76.9808362
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 16,
        blackboxId: "b16",
        location: {
          lat: 38.896392,
          lng: -76.9839277
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 17,
        blackboxId: "b17",
        location: {
          lat: 38.8986317,
          lng: -76.9807917
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 18,
        blackboxId: "b18",
        location: {
          lat: 38.898415,
          lng: -76.980851
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 19,
        blackboxId: "b19",
        location: {
          lat: 38.8986317,
          lng: -76.9807667
        },
        possessionType: "RANGER",
        action: "CHARGE"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.8713427,
          lng: -76.9810476
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 1,
        blackboxId: "b1",
        location: {
          lat: 38.8655332,
          lng: -76.9739889
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 2,
        blackboxId: "b2",
        location: {
          lat: 38.865544,
          lng: -76.9739691
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 3,
        blackboxId: "b3",
        location: {
          lat: 38.8655448,
          lng: -76.9739681
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 4,
        blackboxId: "b4",
        location: {
          lat: 38.8655473,
          lng: -76.9739677
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 5,
        blackboxId: "b5",
        location: {
          lat: 38.8655337,
          lng: -76.9739675
        },
        possessionType: "RANGER",
        action: "CHARGE"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.9091675,
          lng: -76.926674
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 1,
        blackboxId: "b1",
        location: {
          lat: 38.92033,
          lng: -76.912775
        },
        possessionType: "RANGER",
        action: "CHARGEANDRETURN"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.902595,
          lng: -77.0135833
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 1,
        blackboxId: "b1",
        location: {
          lat: 38.9025867,
          lng: -77.0151888
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 2,
        blackboxId: "b2",
        location: {
          lat: 38.9090671,
          lng: -77.0320279
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 3,
        blackboxId: "b3",
        location: {
          lat: 38.9129383,
          lng: -77.021925
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 4,
        blackboxId: "b4",
        location: {
          lat: 38.902639,
          lng: -77.0134256
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 5,
        blackboxId: "b5",
        location: {
          lat: 38.9096978,
          lng: -77.033326
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 6,
        blackboxId: "b6",
        location: {
          lat: 38.9090767,
          lng: -77.0320256
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 7,
        blackboxId: "b7",
        location: {
          lat: 38.9090867,
          lng: -77.031995
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 8,
        blackboxId: "b8",
        location: {
          lat: 38.9088912,
          lng: -77.0321751
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 9,
        blackboxId: "b9",
        location: {
          lat: 38.9026233,
          lng: -77.0134906
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 10,
        blackboxId: "b10",
        location: {
          lat: 38.9028315,
          lng: -77.0182476
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 11,
        blackboxId: "b11",
        location: {
          lat: 38.9130402,
          lng: -77.0219914
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 12,
        blackboxId: "b12",
        location: {
          lat: 38.9097883,
          lng: -77.03197
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 13,
        blackboxId: "b13",
        location: {
          lat: 38.9130555,
          lng: -77.0220135
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 14,
        blackboxId: "b14",
        location: {
          lat: 38.9026866,
          lng: -77.0174869
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 15,
        blackboxId: "b15",
        location: {
          lat: 38.9131817,
          lng: -77.0220083
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 16,
        blackboxId: "b16",
        location: {
          lat: 38.9013328,
          lng: -77.0298074
        },
        possessionType: "RANGER",
        action: "CHARGEANDRETURN"
      },
      {
        vehicleId: 17,
        blackboxId: "b17",
        location: {
          lat: 38.9096989,
          lng: -77.0322083
        },
        possessionType: "RANGER",
        action: "CHARGEANDRETURN"
      },
      {
        vehicleId: 18,
        blackboxId: "b18",
        location: {
          lat: 38.9007479,
          lng: -77.0192721
        },
        possessionType: "RANGER",
        action: "CHARGEANDRETURN"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.9006694,
          lng: -77.044682
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 1,
        blackboxId: "b1",
        location: {
          lat: 38.90022,
          lng: -77.0394583
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 2,
        blackboxId: "b2",
        location: {
          lat: 38.9002815,
          lng: -77.0401139
        },
        possessionType: "RANGER",
        action: "CHARGE"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.8927417,
          lng: -76.9523033
        },
        possessionType: "RANGER",
        action: "CHARGE"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.9213433,
          lng: -76.9816299
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 1,
        blackboxId: "b1",
        location: {
          lat: 38.9215422,
          lng: -76.9818922
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 2,
        blackboxId: "b2",
        location: {
          lat: 38.9214046,
          lng: -76.9817723
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 3,
        blackboxId: "b3",
        location: {
          lat: 38.9213262,
          lng: -76.9817927
        },
        possessionType: "RANGER",
        action: "CHARGEANDRETURN"
      },
      {
        vehicleId: 4,
        blackboxId: "b4",
        location: {
          lat: 38.920635,
          lng: -77.0002889
        },
        possessionType: "RANGER",
        action: "CHARGEANDRETURN"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.9472355,
          lng: -76.9978565
        },
        possessionType: "RANGER",
        action: "CHARGE"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 39.0465983,
          lng: -76.97749
        },
        possessionType: "RANGER",
        action: "CHARGE"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.869774,
          lng: -77.0876049
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 1,
        blackboxId: "b1",
        location: {
          lat: 38.8698202,
          lng: -77.0875575
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 2,
        blackboxId: "b2",
        location: {
          lat: 38.8697549,
          lng: -77.087715
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 3,
        blackboxId: "b3",
        location: {
          lat: 38.8697561,
          lng: -77.0876194
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 4,
        blackboxId: "b4",
        location: {
          lat: 38.8698033,
          lng: -77.0876469
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 5,
        blackboxId: "b5",
        location: {
          lat: 38.8697921,
          lng: -77.0876401
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 6,
        blackboxId: "b6",
        location: {
          lat: 38.86975,
          lng: -77.0876633
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 7,
        blackboxId: "b7",
        location: {
          lat: 38.8696793,
          lng: -77.087753
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 8,
        blackboxId: "b8",
        location: {
          lat: 38.8697634,
          lng: -77.0876514
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 9,
        blackboxId: "b9",
        location: {
          lat: 38.8698156,
          lng: -77.0875869
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 10,
        blackboxId: "b10",
        location: {
          lat: 38.8699375,
          lng: -77.0878738
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 11,
        blackboxId: "b11",
        location: {
          lat: 38.8697421,
          lng: -77.0876224
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 12,
        blackboxId: "b12",
        location: {
          lat: 38.8697154,
          lng: -77.0877427
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 13,
        blackboxId: "b13",
        location: {
          lat: 38.8697217,
          lng: -77.0876117
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 14,
        blackboxId: "b14",
        location: {
          lat: 38.8696917,
          lng: -77.08747
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 15,
        blackboxId: "b15",
        location: {
          lat: 38.8697133,
          lng: -77.0876067
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 16,
        blackboxId: "b16",
        location: {
          lat: 38.8697271,
          lng: -77.0875655
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 17,
        blackboxId: "b17",
        location: {
          lat: 38.8696467,
          lng: -77.0876583
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 18,
        blackboxId: "b18",
        location: {
          lat: 38.8696136,
          lng: -77.0876899
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 19,
        blackboxId: "b19",
        location: {
          lat: 38.8696747,
          lng: -77.0875544
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 20,
        blackboxId: "b20",
        location: {
          lat: 38.8697019,
          lng: -77.0876648
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 21,
        blackboxId: "b21",
        location: {
          lat: 38.8696573,
          lng: -77.0877443
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 22,
        blackboxId: "b22",
        location: {
          lat: 38.8695936,
          lng: -77.0873562
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 23,
        blackboxId: "b23",
        location: {
          lat: 38.8696809,
          lng: -77.0876331
        },
        possessionType: "RANGER",
        action: "CHARGE"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.9478284,
          lng: -77.0727198
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 1,
        blackboxId: "b1",
        location: {
          lat: 38.9476899,
          lng: -77.0725048
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 2,
        blackboxId: "b2",
        location: {
          lat: 38.9477415,
          lng: -77.0725696
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 3,
        blackboxId: "b3",
        location: {
          lat: 38.9476144,
          lng: -77.0726041
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 4,
        blackboxId: "b4",
        location: {
          lat: 38.9471733,
          lng: -77.0725067
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 5,
        blackboxId: "b5",
        location: {
          lat: 38.9476811,
          lng: -77.0725712
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 6,
        blackboxId: "b6",
        location: {
          lat: 38.9477634,
          lng: -77.0725331
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 7,
        blackboxId: "b7",
        location: {
          lat: 38.9476915,
          lng: -77.0724711
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 8,
        blackboxId: "b8",
        location: {
          lat: 38.9477259,
          lng: -77.0725824
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 9,
        blackboxId: "b9",
        location: {
          lat: 38.9476869,
          lng: -77.0729151
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 10,
        blackboxId: "b10",
        location: {
          lat: 38.9476644,
          lng: -77.0728998
        },
        possessionType: "RANGER",
        action: "CHARGE"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.8661531,
          lng: -77.2055452
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 1,
        blackboxId: "b1",
        location: {
          lat: 38.8660062,
          lng: -77.2022259
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 2,
        blackboxId: "b2",
        location: {
          lat: 38.8660483,
          lng: -77.1977387
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 3,
        blackboxId: "b3",
        location: {
          lat: 38.866022,
          lng: -77.2011885
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 4,
        blackboxId: "b4",
        location: {
          lat: 38.86599,
          lng: -77.2046286
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 5,
        blackboxId: "b5",
        location: {
          lat: 38.8659648,
          lng: -77.2066805
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 6,
        blackboxId: "b6",
        location: {
          lat: 38.8660001,
          lng: -77.2033335
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 7,
        blackboxId: "b7",
        location: {
          lat: 38.8659591,
          lng: -77.2054215
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 8,
        blackboxId: "b8",
        location: {
          lat: 38.8660168,
          lng: -77.2044237
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 9,
        blackboxId: "b9",
        location: {
          lat: 38.8659954,
          lng: -77.2036938
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 10,
        blackboxId: "b10",
        location: {
          lat: 38.8660315,
          lng: -77.2036965
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 11,
        blackboxId: "b11",
        location: {
          lat: 38.8659515,
          lng: -77.2046021
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 12,
        blackboxId: "b12",
        location: {
          lat: 38.8659724,
          lng: -77.2038914
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 13,
        blackboxId: "b13",
        location: {
          lat: 38.8660083,
          lng: -77.2029402
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 14,
        blackboxId: "b14",
        location: {
          lat: 38.8660133,
          lng: -77.2013883
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 15,
        blackboxId: "b15",
        location: {
          lat: 38.8660677,
          lng: -77.1981559
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 16,
        blackboxId: "b16",
        location: {
          lat: 38.8660482,
          lng: -77.1987539
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 17,
        blackboxId: "b17",
        location: {
          lat: 38.8660305,
          lng: -77.2011924
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 18,
        blackboxId: "b18",
        location: {
          lat: 38.8660233,
          lng: -77.2001
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 19,
        blackboxId: "b19",
        location: {
          lat: 38.8659664,
          lng: -77.2051785
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 20,
        blackboxId: "b20",
        location: {
          lat: 38.8660963,
          lng: -77.1983469
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 21,
        blackboxId: "b21",
        location: {
          lat: 38.8659483,
          lng: -77.2051776
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 22,
        blackboxId: "b22",
        location: {
          lat: 38.8660733,
          lng: -77.1982183
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 23,
        blackboxId: "b23",
        location: {
          lat: 38.8659333,
          lng: -77.20836
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 24,
        blackboxId: "b24",
        location: {
          lat: 38.8660014,
          lng: -77.2047825
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 25,
        blackboxId: "b25",
        location: {
          lat: 38.8660667,
          lng: -77.1988767
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 26,
        blackboxId: "b26",
        location: {
          lat: 38.8659885,
          lng: -77.2020702
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 27,
        blackboxId: "b27",
        location: {
          lat: 38.8660113,
          lng: -77.2042483
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 28,
        blackboxId: "b28",
        location: {
          lat: 38.8665449,
          lng: -77.1998453
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 29,
        blackboxId: "b29",
        location: {
          lat: 38.8660467,
          lng: -77.1995983
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 30,
        blackboxId: "b30",
        location: {
          lat: 38.8660746,
          lng: -77.1990545
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 31,
        blackboxId: "b31",
        location: {
          lat: 38.8663166,
          lng: -77.2022842
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 32,
        blackboxId: "b32",
        location: {
          lat: 38.8659979,
          lng: -77.2038624
        },
        possessionType: "RANGER",
        action: "CHARGE"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.8941124,
          lng: -77.0784756
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 1,
        blackboxId: "b1",
        location: {
          lat: 38.8938948,
          lng: -77.0787721
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 2,
        blackboxId: "b2",
        location: {
          lat: 38.8942018,
          lng: -77.0781856
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 3,
        blackboxId: "b3",
        location: {
          lat: 38.8939633,
          lng: -77.0791307
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 4,
        blackboxId: "b4",
        location: {
          lat: 38.8944301,
          lng: -77.0776584
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 5,
        blackboxId: "b5",
        location: {
          lat: 38.8946513,
          lng: -77.0755231
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 6,
        blackboxId: "b6",
        location: {
          lat: 38.8943318,
          lng: -77.0772915
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 7,
        blackboxId: "b7",
        location: {
          lat: 38.894238,
          lng: -77.0776379
        },
        possessionType: "RANGER",
        action: "CHARGE"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.8696044,
          lng: -77.1113213
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 1,
        blackboxId: "b1",
        location: {
          lat: 38.8695463,
          lng: -77.1113572
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 2,
        blackboxId: "b2",
        location: {
          lat: 38.869635,
          lng: -77.1112667
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 3,
        blackboxId: "b3",
        location: {
          lat: 38.869615,
          lng: -77.1113833
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 4,
        blackboxId: "b4",
        location: {
          lat: 38.85405097160381,
          lng: -77.12431713945895
        },
        possessionType: "RANGER",
        action: "CHARGEANDRETURN"
      },
      {
        vehicleId: 5,
        blackboxId: "b5",
        location: {
          lat: 38.8695138,
          lng: -77.1112682
        },
        possessionType: "RANGER",
        action: "CHARGEANDRETURN"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.857392,
          lng: -77.0602268
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 1,
        blackboxId: "b1",
        location: {
          lat: 38.8573918,
          lng: -77.0602272
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 2,
        blackboxId: "b2",
        location: {
          lat: 38.8574206,
          lng: -77.0601921
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 3,
        blackboxId: "b3",
        location: {
          lat: 38.8574106,
          lng: -77.060222
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 4,
        blackboxId: "b4",
        location: {
          lat: 38.8573993,
          lng: -77.0602271
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 5,
        blackboxId: "b5",
        location: {
          lat: 38.8576925,
          lng: -77.0602859
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 6,
        blackboxId: "b6",
        location: {
          lat: 38.857625,
          lng: -77.0603233
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 7,
        blackboxId: "b7",
        location: {
          lat: 38.8577028,
          lng: -77.0603099
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 8,
        blackboxId: "b8",
        location: {
          lat: 38.8575317,
          lng: -77.060275
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 9,
        blackboxId: "b9",
        location: {
          lat: 38.8576535,
          lng: -77.0603048
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 10,
        blackboxId: "b10",
        location: {
          lat: 38.8573921,
          lng: -77.0602255
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 11,
        blackboxId: "b11",
        location: {
          lat: 38.8573999,
          lng: -77.0602291
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 12,
        blackboxId: "b12",
        location: {
          lat: 38.8573936,
          lng: -77.060238
        },
        possessionType: "RANGER",
        action: "CHARGEANDRETURN"
      },
      {
        vehicleId: 13,
        blackboxId: "b13",
        location: {
          lat: 38.8592589,
          lng: -77.0591447
        },
        possessionType: "RANGER",
        action: "CHARGEANDRETURN"
      },
      {
        vehicleId: 14,
        blackboxId: "b14",
        location: {
          lat: 38.8573922,
          lng: -77.0602249
        },
        possessionType: "RANGER",
        action: "CHARGEANDRETURN"
      },
      {
        vehicleId: 15,
        blackboxId: "b15",
        location: {
          lat: 38.8574156,
          lng: -77.0602678
        },
        possessionType: "RANGER",
        action: "CHARGEANDRETURN"
      },
      {
        vehicleId: 16,
        blackboxId: "b16",
        location: {
          lat: 38.8573974,
          lng: -77.0602397
        },
        possessionType: "RANGER",
        action: "CHARGEANDRETURN"
      },
      {
        vehicleId: 17,
        blackboxId: "b17",
        location: {
          lat: 38.8573917,
          lng: -77.0602262
        },
        possessionType: "RANGER",
        action: "CHARGEANDRETURN"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.8773017,
          lng: -77.0504783
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 1,
        blackboxId: "b1",
        location: {
          lat: 38.8774251,
          lng: -77.0506582
        },
        possessionType: "RANGER",
        action: "CHARGE"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.8590228,
          lng: -76.8991143
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 1,
        blackboxId: "b1",
        location: {
          lat: 38.8608313,
          lng: -76.8861845
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 2,
        blackboxId: "b2",
        location: {
          lat: 38.8534887,
          lng: -76.8966684
        },
        possessionType: "RANGER",
        action: "CHARGE"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.8944872,
          lng: -76.8581056
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 1,
        blackboxId: "b1",
        location: {
          lat: 38.8944533,
          lng: -76.8581433
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 2,
        blackboxId: "b2",
        location: {
          lat: 38.894447,
          lng: -76.8581089
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 3,
        blackboxId: "b3",
        location: {
          lat: 38.8945203,
          lng: -76.8580222
        },
        possessionType: "RANGER",
        action: "CHARGEANDRETURN"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.9123201,
          lng: -76.7870099
        },
        possessionType: "RANGER",
        action: "CHARGE"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 39.018885,
          lng: -76.9168133
        },
        possessionType: "RANGER",
        action: "CHARGE"
      },
      {
        vehicleId: 1,
        blackboxId: "b1",
        location: {
          lat: 39.0189562,
          lng: -76.9169282
        },
        possessionType: "RANGER",
        action: "CHARGEANDRETURN"
      },
      {
        vehicleId: 2,
        blackboxId: "b2",
        location: {
          lat: 39.0189734,
          lng: -76.9169519
        },
        possessionType: "RANGER",
        action: "CHARGEANDRETURN"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.9308477,
          lng: -76.9002318
        },
        possessionType: "RANGER",
        action: "CHARGEANDRETURN"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 39.0544734,
          lng: -77.0452514
        },
        possessionType: "RANGER",
        action: "CHARGEANDRETURN"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.9080946,
          lng: -77.0341801
        },
        possessionType: "RIDER",
        action: "RIDE"
      },
      {
        vehicleId: 1,
        blackboxId: "b1",
        location: {
          lat: 38.8965106,
          lng: -77.0465485
        },
        possessionType: "RIDER",
        action: "RIDE"
      },
      {
        vehicleId: 2,
        blackboxId: "b2",
        location: {
          lat: 38.9012774,
          lng: -77.034666
        },
        possessionType: "RIDER",
        action: "RIDE"
      },
      {
        vehicleId: 3,
        blackboxId: "b3",
        location: {
          lat: 38.9028047,
          lng: -77.0194653
        },
        possessionType: "RIDER",
        action: "RIDE"
      },
      {
        vehicleId: 4,
        blackboxId: "b4",
        location: {
          lat: 38.912277,
          lng: -77.0363752
        },
        possessionType: "RIDER",
        action: "RIDE"
      }
    ],
    isSelected: false
  },
  {
    pins: [
      {
        vehicleId: 0,
        blackboxId: "b0",
        location: {
          lat: 38.8575279,
          lng: -77.0535197
        },
        possessionType: "RIDER",
        action: "RIDE"
      }
    ],
    isSelected: false
  }
];

export default { pins, possessions };
