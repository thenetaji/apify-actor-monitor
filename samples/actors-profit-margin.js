/**
 * NOTE: All financial values (revenue, costs, counts, etc.) have been randomized
 * while preserving the API response structure. This is sample data only.
 */
fetch("https://console-backend.apify.com/actor-analytics/profit-margin?month=2026-04-01", {
    "headers": {
        "accept": "application/json, text/plain, */*",
        "authorization": "Bearer [REDACTED]",
        "sec-ch-ua": "\"Google Chrome\";v=\"147\", \"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"147\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "x-idempotency-key": "00000000-0000-0010-0000-000000000000",
        "Referer": "https://console.apify.com/"
    },
    "body": null,
    "method": "GET"
});

/**
 * {
    "totalProfitMarginStats": {
        "payingUsersUsd": {
            "costUsd": 8.606714587034888,
            "revenueUsd": 1118.5108400000001,
            "profitUsd": 1109.9041254129652,
            "margin": 0.21
        },
        "allUsersUsd": {
            "costUsd": 14.40157200809563,
            "revenueUsd": 1229.67588,
            "profitUsd": 1215.2743079919044,
            "margin": 0.21
        }
    },
    "dailyProfitMarginStats": {
        "2026-04-01": {
            "payingUsersUsd": {
                "costUsd": 0.4779116701104377,
                "revenueUsd": 35.14916,
                "profitUsd": 34.671248329889565,
                "margin": 0.21
            },
            "allUsersUsd": {
                "costUsd": 0.6403609043769224,
                "revenueUsd": 46.9108,
                "profitUsd": 46.27043909562308,
                "margin": 0.21
            }
        },
        "2026-04-02": {
            "payingUsersUsd": {
                "costUsd": 0.2164585134366726,
                "revenueUsd": 28.977920000000005,
                "profitUsd": 28.76146148656333,
                "margin": 0.21
            },
            "allUsersUsd": {
                "costUsd": 0.31923342927894244,
                "revenueUsd": 36.16364000000001,
                "profitUsd": 35.84440657072106,
                "margin": 0.21
            }
        },
        "2026-04-03": {
            "payingUsersUsd": {
                "costUsd": 0.2004519473610985,
                "revenueUsd": 35.393840000000004,
                "profitUsd": 35.19338805263891,
                "margin": 0.21
            },
            "allUsersUsd": {
                "costUsd": 0.29439785392824486,
                "revenueUsd": 42.104600000000005,
                "profitUsd": 41.81020214607176,
                "margin": 0.21
            }
        },
        "2026-04-04": {
            "payingUsersUsd": {
                "costUsd": 0.10757311877891257,
                "revenueUsd": 20.868800000000004,
                "profitUsd": 20.76122688122109,
                "margin": 0.21
            },
            "allUsersUsd": {
                "costUsd": 0.17291662981564634,
                "revenueUsd": 29.10472,
                "profitUsd": 28.931803370184355,
                "margin": 0.21
            }
        },
        "2026-04-05": {
            "payingUsersUsd": {
                "costUsd": 0.043923880866965484,
                "revenueUsd": 25.694320000000005,
                "profitUsd": 25.65039611913304,
                "margin": 0.21
            },
            "allUsersUsd": {
                "costUsd": 0.13709697095104634,
                "revenueUsd": 35.445,
                "profitUsd": 35.30790302904895,
                "margin": 0.21
            }
        },
        "2026-04-06": {
            "payingUsersUsd": {
                "costUsd": 0.13822612306531604,
                "revenueUsd": 33.55532,
                "profitUsd": 33.417093876934686,
                "margin": 0.21
            },
            "allUsersUsd": {
                "costUsd": 0.43134885518943605,
                "revenueUsd": 39.68804,
                "profitUsd": 39.25669114481057,
                "margin": 0.21
            }
        },
        "2026-04-07": {
            "payingUsersUsd": {
                "costUsd": 0.3956383877540867,
                "revenueUsd": 79.1546,
                "profitUsd": 78.75896161224591,
                "margin": 0.21
            },
            "allUsersUsd": {
                "costUsd": 1.4493030830271376,
                "revenueUsd": 87.07056000000001,
                "profitUsd": 85.62125691697288,
                "margin": 0.21
            }
        },
        "2026-04-08": {
            "payingUsersUsd": {
                "costUsd": 0.6789246885940474,
                "revenueUsd": 54.11432,
                "profitUsd": 53.435395311405955,
                "margin": 0.21
            },
            "allUsersUsd": {
                "costUsd": 2.917617707612126,
                "revenueUsd": 67.032,
                "profitUsd": 64.11438229238787,
                "margin": 0.21
            }
        },
        "2026-04-09": {
            "payingUsersUsd": {
                "costUsd": 0.9520003237977546,
                "revenueUsd": 113.92407999999999,
                "profitUsd": 112.97207967620224,
                "margin": 0.21
            },
            "allUsersUsd": {
                "costUsd": 1.3002967053143206,
                "revenueUsd": 117.16384,
                "profitUsd": 115.86354329468567,
                "margin": 0.21
            }
        },
        "2026-04-10": {
            "payingUsersUsd": {
                "costUsd": 0.40251293882654804,
                "revenueUsd": 31.812040000000003,
                "profitUsd": 31.409527061173456,
                "margin": 0.21
            },
            "allUsersUsd": {
                "costUsd": 0.6935055796376186,
                "revenueUsd": 40.575,
                "profitUsd": 39.88149442036239,
                "margin": 0.21
            }
        },
        "2026-04-11": {
            "payingUsersUsd": {
                "costUsd": 0.03559718891437103,
                "revenueUsd": 2.71292,
                "profitUsd": 2.677322811085629,
                "margin": 0.21
            },
            "allUsersUsd": {
                "costUsd": 0.117956071177048,
                "revenueUsd": 10.834560000000002,
                "profitUsd": 10.716603928822954,
                "margin": 0.21
            }
        },
        "2026-04-12": {
            "payingUsersUsd": {
                "costUsd": 0.15227317779737298,
                "revenueUsd": 53.566880000000005,
                "profitUsd": 53.41460682220263,
                "margin": 0.21
            },
            "allUsersUsd": {
                "costUsd": 0.19232429886991365,
                "revenueUsd": 54.71016000000001,
                "profitUsd": 54.517835701130096,
                "margin": 0.21
            }
        },
        "2026-04-13": {
            "payingUsersUsd": {
                "costUsd": 0.4246865767790553,
                "revenueUsd": 45.623560000000005,
                "profitUsd": 45.19887342322095,
                "margin": 0.21
            },
            "allUsersUsd": {
                "costUsd": 0.7669555336993513,
                "revenueUsd": 50.520480000000006,
                "profitUsd": 49.753524466300654,
                "margin": 0.21
            }
        },
        "2026-04-14": {
            "payingUsersUsd": {
                "costUsd": 0.5855622863539232,
                "revenueUsd": 65.42232000000001,
                "profitUsd": 64.8367577136461,
                "margin": 0.21
            },
            "allUsersUsd": {
                "costUsd": 0.6482255221860084,
                "revenueUsd": 65.86104,
                "profitUsd": 65.21281447781399,
                "margin": 0.21
            }
        },
        "2026-04-15": {
            "payingUsersUsd": {
                "costUsd": 0.8849324131192394,
                "revenueUsd": 93.1274,
                "profitUsd": 92.24246758688075,
                "margin": 0.21
            },
            "allUsersUsd": {
                "costUsd": 0.9108210509894965,
                "revenueUsd": 94.73931999999999,
                "profitUsd": 93.8284989490105,
                "margin": 0.21
            }
        },
        "2026-04-16": {
            "payingUsersUsd": {
                "costUsd": 0.9297559976956814,
                "revenueUsd": 153.45624,
                "profitUsd": 152.52648400230433,
                "margin": 0.21
            },
            "allUsersUsd": {
                "costUsd": 1.0278077071046947,
                "revenueUsd": 156.32940000000002,
                "profitUsd": 155.30159229289532,
                "margin": 0.21
            }
        },
        "2026-04-17": {
            "payingUsersUsd": {
                "costUsd": 0.5831093252092386,
                "revenueUsd": 75.45192,
                "profitUsd": 74.86881067479077,
                "margin": 0.21
            },
            "allUsersUsd": {
                "costUsd": 0.6749930270737644,
                "revenueUsd": 77.59563999999999,
                "profitUsd": 76.92064697292622,
                "margin": 0.21
            }
        },
        "2026-04-18": {
            "payingUsersUsd": {
                "costUsd": 0.288006813168882,
                "revenueUsd": 61.72532000000001,
                "profitUsd": 61.437313186831126,
                "margin": 0.21
            },
            "allUsersUsd": {
                "costUsd": 0.386213957353973,
                "revenueUsd": 65.54996,
                "profitUsd": 65.16374604264603,
                "margin": 0.21
            }
        },
        "2026-04-19": {
            "payingUsersUsd": {
                "costUsd": 0.41738997184073007,
                "revenueUsd": 38.35988,
                "profitUsd": 37.94249002815927,
                "margin": 0.21
            },
            "allUsersUsd": {
                "costUsd": 0.5031249263319382,
                "revenueUsd": 39.8472,
                "profitUsd": 39.344075073668066,
                "margin": 0.21
            }
        },
        "2026-04-20": {
            "payingUsersUsd": {
                "costUsd": 0.602625572982109,
                "revenueUsd": 55.298080000000006,
                "profitUsd": 54.6954544270179,
                "margin": 0.21
            },
            "allUsersUsd": {
                "costUsd": 0.7150292627250665,
                "revenueUsd": 56.739160000000005,
                "profitUsd": 56.02413073727494,
                "margin": 0.21
            }
        },
        "2026-04-21": {
            "payingUsersUsd": {
                "costUsd": 0.08915367058244686,
                "revenueUsd": 15.12192,
                "profitUsd": 15.032766329417553,
                "margin": 0.21
            },
            "allUsersUsd": {
                "costUsd": 0.10204293145293833,
                "revenueUsd": 15.690760000000001,
                "profitUsd": 15.588717068547062,
                "margin": 0.21
            }
        }
    }
}
 */