/**
 * NOTE: All financial values (revenue, costs, counts, etc.) have been randomized
 * while preserving the API response structure. This is sample data only.
 */
fetch("https://console-backend.apify.com/actor-analytics/profit-margin?month=2026-04-01&actorIds%5B%5D=L1pgSVp05HPJPOpr1", {
    "headers": {
        "accept": "application/json, text/plain, */*",
        "authorization": "Bearer [REDACTED]",
        "sec-ch-ua": "\"Google Chrome\";v=\"147\", \"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"147\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "x-idempotency-key": "00000000-0000-0003-0000-000000000000",
        "Referer": "https://console.apify.com/"
    },
    "body": null,
    "method": "GET"
});

/**
 * {
    "totalProfitMarginStats": {
        "payingUsersUsd": {
            "costUsd": 1.4486666375067476,
            "revenueUsd": 420.9672,
            "profitUsd": 419.51853336249326,
            "margin": 0.16
        },
        "allUsersUsd": {
            "costUsd": 1.488398226177667,
            "revenueUsd": 433.12960000000004,
            "profitUsd": 431.6412017738224,
            "margin": 0.16
        }
    },
    "dailyProfitMarginStats": {
        "2026-04-01": {
            "payingUsersUsd": {
                "costUsd": 0.009240779690682061,
                "revenueUsd": 2.8136,
                "profitUsd": 2.804359220309318,
                "margin": 0.16
            },
            "allUsersUsd": {
                "costUsd": 0.013118899531805681,
                "revenueUsd": 4.249600000000001,
                "profitUsd": 4.236481100468195,
                "margin": 0.16
            }
        },
        "2026-04-02": {
            "payingUsersUsd": {
                "costUsd": 0.04293924322925508,
                "revenueUsd": 13.078000000000001,
                "profitUsd": 13.035060756770745,
                "margin": 0.16
            },
            "allUsersUsd": {
                "costUsd": 0.04490284751158953,
                "revenueUsd": 13.926000000000002,
                "profitUsd": 13.881097152488412,
                "margin": 0.16
            }
        },
        "2026-04-03": {
            "payingUsersUsd": {
                "costUsd": 0.0007026455110377735,
                "revenueUsd": 0.1784,
                "profitUsd": 0.17769735448896223,
                "margin": 0.16
            },
            "allUsersUsd": {
                "costUsd": 0.001986352640392052,
                "revenueUsd": 0.6408,
                "profitUsd": 0.638813647359608,
                "margin": 0.16
            }
        },
        "2026-04-04": {
            "payingUsersUsd": {
                "costUsd": 0.019129852328869202,
                "revenueUsd": 5.778,
                "profitUsd": 5.75887014767113,
                "margin": 0.16
            },
            "allUsersUsd": {
                "costUsd": 0.02055544303737332,
                "revenueUsd": 6.346,
                "profitUsd": 6.325444556962627,
                "margin": 0.16
            }
        },
        "2026-04-05": {
            "payingUsersUsd": {
                "costUsd": 0.016803710528670916,
                "revenueUsd": 5.5456,
                "profitUsd": 5.528796289471329,
                "margin": 0.16
            },
            "allUsersUsd": {
                "costUsd": 0.01841521557120896,
                "revenueUsd": 6.209600000000001,
                "profitUsd": 6.191184784428792,
                "margin": 0.16
            }
        },
        "2026-04-06": {
            "payingUsersUsd": {
                "costUsd": 0.012589471611224942,
                "revenueUsd": 3.7724,
                "profitUsd": 3.7598105283887753,
                "margin": 0.16
            },
            "allUsersUsd": {
                "costUsd": 0.014132496927219958,
                "revenueUsd": 4.2804,
                "profitUsd": 4.26626750307278,
                "margin": 0.16
            }
        },
        "2026-04-07": {
            "payingUsersUsd": {
                "costUsd": 0.042413777793764235,
                "revenueUsd": 11.202800000000002,
                "profitUsd": 11.160386222206238,
                "margin": 0.16
            },
            "allUsersUsd": {
                "costUsd": 0.04410988901773508,
                "revenueUsd": 11.837200000000001,
                "profitUsd": 11.793090110982266,
                "margin": 0.16
            }
        },
        "2026-04-08": {
            "payingUsersUsd": {
                "costUsd": 0.03500089429591679,
                "revenueUsd": 8.832400000000002,
                "profitUsd": 8.797399105704084,
                "margin": 0.16
            },
            "allUsersUsd": {
                "costUsd": 0.038003844749973044,
                "revenueUsd": 9.780400000000002,
                "profitUsd": 9.742396155250029,
                "margin": 0.16
            }
        },
        "2026-04-09": {
            "payingUsersUsd": {
                "costUsd": 0.0266247677446074,
                "revenueUsd": 6.365600000000001,
                "profitUsd": 6.338975232255393,
                "margin": 0.16
            },
            "allUsersUsd": {
                "costUsd": 0.027762340055561732,
                "revenueUsd": 6.7696000000000005,
                "profitUsd": 6.741837659944439,
                "margin": 0.16
            }
        },
        "2026-04-10": {
            "payingUsersUsd": {
                "costUsd": 0.05172361493307766,
                "revenueUsd": 17.3852,
                "profitUsd": 17.333476385066923,
                "margin": 0.16
            },
            "allUsersUsd": {
                "costUsd": 0.06335719392315464,
                "revenueUsd": 19.8148,
                "profitUsd": 19.75144280607685,
                "margin": 0.16
            }
        },
        "2026-04-11": {
            "payingUsersUsd": {
                "costUsd": 0.0035859928991115756,
                "revenueUsd": 1.0544,
                "profitUsd": 1.0508140071008885,
                "margin": 0.16
            },
            "allUsersUsd": {
                "costUsd": 0.007235823024527894,
                "revenueUsd": 1.6624,
                "profitUsd": 1.6551641769754721,
                "margin": 0.16
            }
        },
        "2026-04-12": {
            "payingUsersUsd": {
                "costUsd": 0.064335803075225,
                "revenueUsd": 20.139200000000002,
                "profitUsd": 20.07486419692478,
                "margin": 0.16
            },
            "allUsersUsd": {
                "costUsd": 0.06525794543485923,
                "revenueUsd": 20.480800000000002,
                "profitUsd": 20.415542054565144,
                "margin": 0.16
            }
        },
        "2026-04-13": {
            "payingUsersUsd": {
                "costUsd": 0.07175566727080362,
                "revenueUsd": 20.897600000000004,
                "profitUsd": 20.8258443327292,
                "margin": 0.16
            },
            "allUsersUsd": {
                "costUsd": 0.07342827175382692,
                "revenueUsd": 21.5816,
                "profitUsd": 21.508171728246175,
                "margin": 0.16
            }
        },
        "2026-04-14": {
            "payingUsersUsd": {
                "costUsd": 0.048402871871322396,
                "revenueUsd": 16.565600000000003,
                "profitUsd": 16.517197128128682,
                "margin": 0.16
            },
            "allUsersUsd": {
                "costUsd": 0.04905738622908295,
                "revenueUsd": 16.765600000000003,
                "profitUsd": 16.71654261377092,
                "margin": 0.16
            }
        },
        "2026-04-15": {
            "payingUsersUsd": {
                "costUsd": 0.16516290032701786,
                "revenueUsd": 54.5144,
                "profitUsd": 54.34923709967298,
                "margin": 0.16
            },
            "allUsersUsd": {
                "costUsd": 0.16607458809920742,
                "revenueUsd": 54.870400000000004,
                "profitUsd": 54.7043254119008,
                "margin": 0.16
            }
        },
        "2026-04-16": {
            "payingUsersUsd": {
                "costUsd": 0.3108119023061999,
                "revenueUsd": 75.30620000000002,
                "profitUsd": 74.99538809769382,
                "margin": 0.16
            },
            "allUsersUsd": {
                "costUsd": 0.31231800298875156,
                "revenueUsd": 75.79020000000001,
                "profitUsd": 75.47788199701127,
                "margin": 0.16
            }
        },
        "2026-04-17": {
            "payingUsersUsd": {
                "costUsd": 0.20133413521484042,
                "revenueUsd": 59.7334,
                "profitUsd": 59.53206586478516,
                "margin": 0.16
            },
            "allUsersUsd": {
                "costUsd": 0.20164042462245133,
                "revenueUsd": 59.86300000000001,
                "profitUsd": 59.66135957537755,
                "margin": 0.16
            }
        },
        "2026-04-18": {
            "payingUsersUsd": {
                "costUsd": 0.1021140857133907,
                "revenueUsd": 34.21040000000001,
                "profitUsd": 34.10828591428662,
                "margin": 0.16
            },
            "allUsersUsd": {
                "costUsd": 0.1024067414603424,
                "revenueUsd": 34.3616,
                "profitUsd": 34.25919325853966,
                "margin": 0.16
            }
        },
        "2026-04-19": {
            "payingUsersUsd": {
                "costUsd": 0.08099166463894646,
                "revenueUsd": 27.480400000000003,
                "profitUsd": 27.399408335361056,
                "margin": 0.16
            },
            "allUsersUsd": {
                "costUsd": 0.08133634117266536,
                "revenueUsd": 27.631600000000002,
                "profitUsd": 27.550263658827337,
                "margin": 0.16
            }
        },
        "2026-04-20": {
            "payingUsersUsd": {
                "costUsd": 0.13381184276013242,
                "revenueUsd": 33.4704,
                "profitUsd": 33.336588157239866,
                "margin": 0.16
            },
            "allUsersUsd": {
                "costUsd": 0.13410716466328668,
                "revenueUsd": 33.6248,
                "profitUsd": 33.490692835336716,
                "margin": 0.16
            }
        },
        "2026-04-21": {
            "payingUsersUsd": {
                "costUsd": 0.009191013762651218,
                "revenueUsd": 2.6432,
                "profitUsd": 2.634008986237349,
                "margin": 0.16
            },
            "allUsersUsd": {
                "costUsd": 0.009191013762651218,
                "revenueUsd": 2.6432,
                "profitUsd": 2.634008986237349,
                "margin": 0.16
            }
        }
    }
}
 */