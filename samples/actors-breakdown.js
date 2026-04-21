/**
 * NOTE: All financial values (revenue, costs, counts, etc.) have been randomized
 * while preserving the API response structure. This is sample data only.
 */
fetch("https://console-backend.apify.com/actor-analytics/actor-breakdown?month=2026-04-01", {
    "headers": {
        "accept": "application/json, text/plain, */*",
        "authorization": "Bearer [REDACTED]",
        "sec-ch-ua": "\"Google Chrome\";v=\"147\", \"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"147\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "x-idempotency-key": "00000000-0000-0007-0000-000000000000",
        "Referer": "https://console.apify.com/"
    },
    "body": null,
    "method": "GET"
});

/**
 * {
    "monetizationPerActor": [
        {
            "actor": {
                "_id": "ACTOR_ID_062",
                "isPublic": true,
                "isDeprecated": false,
                "featuredScore": 70,
                "notice": "NONE",
                "name": "actor-004",
                "userId": "ACTOR_ID_063",
                "resourceGroupId": null,
                "title": "Example Actor 01",
                "username": "example-user",
                "pictureUrl": "https://example.s3.amazonaws.com/actor-image.png",
                "actorPermissionLevel": "LIMITED_PERMISSIONS"
            },
            "runsStats": {
                "ABORTED": 6,
                "FAILED": 0,
                "SUCCEEDED": 207,
                "TIMED-OUT": 0,
                "TOTAL": 264,
                "RESULTS": 18117
            },
            "earningsStats": {
                "totalRevenueUsd": 310.14,
                "totalCostUsd": 6.41,
                "totalProfitUsd": 223.29
            },
            "usersStats": {
                "freeUsers": 39,
                "payingUsers": 20
            },
            "chargedResults": 9589,
            "currentPricingInfo": {
                "pricePerUnitUsd": 7,
                "trialMinutes": 10080,
                "pricingModel": "FLAT_PRICE_PER_MONTH",
                "isPriceChangeNotificationSuppressed": false,
                "reasonForChange": "The price is increasing to support the ongoing maintenance of the project. If you have any issue with the pricing please contact us at example-user@proton.me",
                "startedAt": "2026-01-22T11:13:09.387Z",
                "createdAt": "2026-01-08T11:13:09.672Z",
                "apifyMarginPercentage": 0.2,
                "notifiedAboutFutureChangeAt": "2026-01-08T11:13:29.991Z"
            }
        },
        {
            "actor": {
                "_id": "ACTOR_ID_064",
                "isPublic": true,
                "isDeprecated": false,
                "featuredScore": 70,
                "notice": "NONE",
                "name": "actor-005",
                "userId": "ACTOR_ID_063",
                "resourceGroupId": null,
                "title": "Example Actor 02",
                "username": "example-user",
                "pictureUrl": "https://example.s3.amazonaws.com/actor-image.png",
                "actorPermissionLevel": "LIMITED_PERMISSIONS"
            },
            "runsStats": {
                "ABORTED": 6,
                "FAILED": 0,
                "SUCCEEDED": 207,
                "TIMED-OUT": 0,
                "TOTAL": 264,
                "RESULTS": 18117
            },
            "earningsStats": {
                "totalRevenueUsd": 310.14,
                "totalCostUsd": 6.41,
                "totalProfitUsd": 223.29
            },
            "usersStats": {
                "freeUsers": 39,
                "payingUsers": 20
            },
            "chargedResults": 9589,
            "currentPricingInfo": {
                "pricePerUnitUsd": 7,
                "trialMinutes": 4320,
                "pricingModel": "FLAT_PRICE_PER_MONTH",
                "isPriceChangeNotificationSuppressed": false,
                "reasonForChange": "The price has been adjusted from 5 to 7 to reflect increased costs and to ensure we can continue maintaining the same level of quality and service. The change is small and reasonable, keeping affordability in mind while balancing sustainability.",
                "startedAt": "2025-10-06T00:00:00.000Z",
                "createdAt": "2025-09-22T16:02:15.098Z",
                "apifyMarginPercentage": 0.2,
                "notifiedAboutFutureChangeAt": "2025-09-22T16:02:36.086Z"
            }
        },
        {
            "actor": {
                "_id": "ACTOR_ID_065",
                "isPublic": true,
                "isDeprecated": false,
                "featuredScore": 70,
                "notice": "NONE",
                "name": "actor-005",
                "userId": "ACTOR_ID_063",
                "resourceGroupId": null,
                "title": "Example Actor 03",
                "username": "example-user",
                "pictureUrl": "https://example.s3.amazonaws.com/actor-image.png",
                "actorPermissionLevel": "LIMITED_PERMISSIONS"
            },
            "runsStats": {
                "ABORTED": 6,
                "FAILED": 0,
                "SUCCEEDED": 207,
                "TIMED-OUT": 0,
                "TOTAL": 264,
                "RESULTS": 18117
            },
            "earningsStats": {
                "totalRevenueUsd": 310.14,
                "totalCostUsd": 6.41,
                "totalProfitUsd": 223.29
            },
            "usersStats": {
                "freeUsers": 39,
                "payingUsers": 20
            },
            "chargedResults": 9589,
            "currentPricingInfo": {
                "pricePerUnitUsd": 7,
                "trialMinutes": 4320,
                "pricingModel": "FLAT_PRICE_PER_MONTH",
                "isPriceChangeNotificationSuppressed": false,
                "reasonForChange": "Price is increasing to support the ongoing development of the actor. If you have any issue with the pricing please contact us at example-user@proton.me",
                "startedAt": "2026-01-22T11:07:39.792Z",
                "createdAt": "2026-01-08T11:07:40.017Z",
                "apifyMarginPercentage": 0.2,
                "notifiedAboutFutureChangeAt": "2026-01-08T11:08:00.444Z"
            }
        },
        {
            "actor": {
                "_id": "ACTOR_ID_066",
                "isPublic": true,
                "isDeprecated": false,
                "featuredScore": 70,
                "notice": "NONE",
                "name": "actor-005",
                "userId": "ACTOR_ID_063",
                "resourceGroupId": null,
                "title": "Example Actor 04",
                "username": "example-user",
                "pictureUrl": "https://example.s3.amazonaws.com/actor-image.png",
                "actorPermissionLevel": "LIMITED_PERMISSIONS"
            },
            "runsStats": {
                "ABORTED": 6,
                "FAILED": 0,
                "SUCCEEDED": 207,
                "TIMED-OUT": 0,
                "TOTAL": 264,
                "RESULTS": 18117
            },
            "earningsStats": {
                "totalRevenueUsd": 310.14,
                "totalCostUsd": 6.41,
                "totalProfitUsd": 223.29
            },
            "usersStats": {
                "freeUsers": 39,
                "payingUsers": 20
            },
            "chargedResults": 9589,
            "currentPricingInfo": {
                "pricingModel": "PAY_PER_EVENT",
                "createdAt": "2026-02-26T08:01:12.920Z",
                "startedAt": "2026-02-26T08:01:12.920Z",
                "apifyMarginPercentage": 0.2,
                "isPriceChangeNotificationSuppressed": true,
                "reasonForChange": "Migration from Pay Per Result to Pay Per Event with apify-default-dataset-item event",
                "pricingPerEvent": {
                    "ACTOR_ID_067": {
                        "apify-default-dataset-item": {
                            "eventTitle": "result",
                            "eventDescription": "Single result in the default dataset.",
                            "isPrimaryEvent": true,
                            "eventTieredPricingUsd": {
                                "FREE": {
                                    "tieredEventPriceUsd": 0.002
                                },
                                "BRONZE": {
                                    "tieredEventPriceUsd": 0.0017
                                },
                                "SILVER": {
                                    "tieredEventPriceUsd": 0.0015
                                },
                                "GOLD": {
                                    "tieredEventPriceUsd": 0.001
                                },
                                "PLATINUM": {
                                    "tieredEventPriceUsd": 0.001
                                },
                                "DIAMOND": {
                                    "tieredEventPriceUsd": 0.001
                                }
                            }
                        }
                    }
                },
                "forceContainsSignificantPriceChange": false
            }
        },
        {
            "actor": {
                "_id": "ACTOR_ID_068",
                "isPublic": true,
                "isDeprecated": false,
                "featuredScore": 70,
                "notice": "NONE",
                "name": "actor-005",
                "userId": "ACTOR_ID_063",
                "resourceGroupId": null,
                "title": "Example Actor 05",
                "username": "example-user",
                "pictureUrl": "https://example.s3.amazonaws.com/actor-image.png",
                "actorPermissionLevel": "LIMITED_PERMISSIONS"
            },
            "runsStats": {
                "ABORTED": 6,
                "FAILED": 0,
                "SUCCEEDED": 207,
                "TIMED-OUT": 0,
                "TOTAL": 264,
                "RESULTS": 18117
            },
            "earningsStats": {
                "totalRevenueUsd": 310.14,
                "totalCostUsd": 6.41,
                "totalProfitUsd": -0.01201208631439507
            },
            "usersStats": {
                "freeUsers": 39,
                "payingUsers": 20
            },
            "chargedResults": 9589,
            "currentPricingInfo": {
                "pricingModel": "PAY_PER_EVENT",
                "createdAt": "2026-02-26T08:01:12.930Z",
                "startedAt": "2026-02-26T08:01:12.930Z",
                "apifyMarginPercentage": 0.2,
                "isPriceChangeNotificationSuppressed": true,
                "reasonForChange": "Migration from Pay Per Result to Pay Per Event with apify-default-dataset-item event",
                "pricingPerEvent": {
                    "ACTOR_ID_067": {
                        "apify-default-dataset-item": {
                            "eventTitle": "result",
                            "eventDescription": "Single result in the default dataset.",
                            "isPrimaryEvent": true,
                            "eventTieredPricingUsd": {
                                "FREE": {
                                    "tieredEventPriceUsd": 0.005
                                },
                                "BRONZE": {
                                    "tieredEventPriceUsd": 0.004
                                },
                                "SILVER": {
                                    "tieredEventPriceUsd": 0.003
                                },
                                "GOLD": {
                                    "tieredEventPriceUsd": 0.002
                                },
                                "PLATINUM": {
                                    "tieredEventPriceUsd": 0.002
                                },
                                "DIAMOND": {
                                    "tieredEventPriceUsd": 0.002
                                }
                            }
                        }
                    }
                },
                "forceContainsSignificantPriceChange": false
            }
        },
        {
            "actor": {
                "_id": "ACTOR_ID_069",
                "isPublic": true,
                "isDeprecated": false,
                "featuredScore": 70,
                "notice": "NONE",
                "name": "actor-006",
                "userId": "ACTOR_ID_063",
                "resourceGroupId": null,
                "title": "Example Actor 06",
                "username": "example-user",
                "pictureUrl": "https://example.s3.amazonaws.com/actor-image.png",
                "actorPermissionLevel": "LIMITED_PERMISSIONS"
            },
            "runsStats": {
                "ABORTED": 6,
                "FAILED": 0,
                "SUCCEEDED": 207,
                "TIMED-OUT": 0,
                "TOTAL": 264,
                "RESULTS": 18117
            },
            "earningsStats": {
                "totalRevenueUsd": 310.14,
                "totalCostUsd": 6.41,
                "totalProfitUsd": 223.29
            },
            "usersStats": {
                "freeUsers": 39,
                "payingUsers": 20
            },
            "chargedResults": 9589,
            "currentPricingInfo": {
                "pricingModel": "PAY_PER_EVENT",
                "createdAt": "2026-02-26T08:01:12.923Z",
                "startedAt": "2026-02-26T08:01:12.923Z",
                "apifyMarginPercentage": 0.2,
                "isPriceChangeNotificationSuppressed": true,
                "reasonForChange": "Migration from Pay Per Result to Pay Per Event with apify-default-dataset-item event",
                "pricingPerEvent": {
                    "ACTOR_ID_067": {
                        "apify-default-dataset-item": {
                            "eventTitle": "result",
                            "eventDescription": "Single result in the default dataset.",
                            "isPrimaryEvent": true,
                            "eventTieredPricingUsd": {
                                "FREE": {
                                    "tieredEventPriceUsd": 0.005
                                },
                                "BRONZE": {
                                    "tieredEventPriceUsd": 0.004
                                },
                                "SILVER": {
                                    "tieredEventPriceUsd": 0.003
                                },
                                "GOLD": {
                                    "tieredEventPriceUsd": 0.002
                                },
                                "PLATINUM": {
                                    "tieredEventPriceUsd": 0.002
                                },
                                "DIAMOND": {
                                    "tieredEventPriceUsd": 0.002
                                }
                            }
                        }
                    }
                },
                "forceContainsSignificantPriceChange": false
            }
        },
        {
            "actor": {
                "_id": "ACTOR_ID_070",
                "isPublic": true,
                "isDeprecated": false,
                "featuredScore": 70,
                "notice": "NONE",
                "name": "actor-006",
                "userId": "ACTOR_ID_063",
                "resourceGroupId": null,
                "title": "Example Actor 07",
                "username": "example-user",
                "pictureUrl": "https://example.s3.amazonaws.com/actor-image.png",
                "actorPermissionLevel": "LIMITED_PERMISSIONS"
            },
            "runsStats": {
                "ABORTED": 6,
                "FAILED": 0,
                "SUCCEEDED": 207,
                "TIMED-OUT": 0,
                "TOTAL": 264,
                "RESULTS": 18117
            },
            "earningsStats": {
                "totalRevenueUsd": 310.14,
                "totalCostUsd": 6.41,
                "totalProfitUsd": 223.29
            },
            "usersStats": {
                "freeUsers": 39,
                "payingUsers": 20
            },
            "chargedResults": 9589,
            "currentPricingInfo": {
                "pricingModel": "PAY_PER_EVENT",
                "createdAt": "2026-02-26T08:01:12.916Z",
                "startedAt": "2026-02-26T08:01:12.916Z",
                "apifyMarginPercentage": 0.2,
                "isPriceChangeNotificationSuppressed": true,
                "reasonForChange": "Migration from Pay Per Result to Pay Per Event with apify-default-dataset-item event",
                "pricingPerEvent": {
                    "ACTOR_ID_067": {
                        "apify-default-dataset-item": {
                            "eventTitle": "result",
                            "eventDescription": "Single result in the default dataset.",
                            "isPrimaryEvent": true,
                            "eventPriceUsd": 0.0015
                        }
                    }
                },
                "forceContainsSignificantPriceChange": false
            }
        },
        {
            "actor": {
                "_id": "ACTOR_ID_071",
                "isPublic": true,
                "isDeprecated": false,
                "featuredScore": 70,
                "notice": "NONE",
                "name": "actor-006",
                "userId": "ACTOR_ID_063",
                "resourceGroupId": null,
                "title": "Example Actor 08",
                "username": "example-user",
                "pictureUrl": "https://example.s3.amazonaws.com/actor-image.png",
                "actorPermissionLevel": "LIMITED_PERMISSIONS"
            },
            "runsStats": {
                "ABORTED": 6,
                "FAILED": 0,
                "SUCCEEDED": 207,
                "TIMED-OUT": 0,
                "TOTAL": 264,
                "RESULTS": 18117
            },
            "earningsStats": {
                "totalRevenueUsd": 310.14,
                "totalCostUsd": 6.41,
                "totalProfitUsd": 223.29
            },
            "usersStats": {
                "freeUsers": 39,
                "payingUsers": 20
            },
            "chargedResults": 9589,
            "currentPricingInfo": {
                "pricingModel": "PAY_PER_EVENT",
                "createdAt": "2026-02-26T08:01:12.913Z",
                "startedAt": "2026-02-26T08:01:12.913Z",
                "apifyMarginPercentage": 0.2,
                "isPriceChangeNotificationSuppressed": true,
                "reasonForChange": "Migration from Pay Per Result to Pay Per Event with apify-default-dataset-item event",
                "pricingPerEvent": {
                    "ACTOR_ID_067": {
                        "apify-default-dataset-item": {
                            "eventTitle": "result",
                            "eventDescription": "Single result in the default dataset.",
                            "isPrimaryEvent": true,
                            "eventPriceUsd": 0.0015
                        }
                    }
                },
                "forceContainsSignificantPriceChange": false
            }
        },
        {
            "actor": {
                "_id": "ACTOR_ID_072",
                "isPublic": true,
                "isDeprecated": false,
                "featuredScore": 70,
                "notice": "NONE",
                "name": "actor-006",
                "userId": "ACTOR_ID_063",
                "resourceGroupId": null,
                "title": "Example Actor 09",
                "username": "example-user",
                "pictureUrl": "https://example.s3.amazonaws.com/actor-image.png",
                "actorPermissionLevel": "LIMITED_PERMISSIONS"
            },
            "runsStats": {
                "ABORTED": 6,
                "FAILED": 0,
                "SUCCEEDED": 207,
                "TIMED-OUT": 0,
                "TOTAL": 264,
                "RESULTS": 18117
            },
            "earningsStats": {
                "totalRevenueUsd": 310.14,
                "totalCostUsd": 6.41,
                "totalProfitUsd": 223.29
            },
            "usersStats": {
                "freeUsers": 39,
                "payingUsers": 20
            },
            "chargedResults": 9589,
            "currentPricingInfo": {
                "pricingModel": "FLAT_PRICE_PER_MONTH",
                "pricePerUnitUsd": 5,
                "trialMinutes": 4320,
                "createdAt": "2025-03-11T10:54:39.108Z",
                "startedAt": "2025-03-11T10:54:39.108Z",
                "apifyMarginPercentage": 0.2,
                "notifiedAboutChangeAt": "2025-03-11T11:35:20.435Z"
            }
        },
        {
            "actor": {
                "_id": "ACTOR_ID_073",
                "isPublic": true,
                "isDeprecated": false,
                "featuredScore": 70,
                "notice": "NONE",
                "name": "actor-007",
                "userId": "ACTOR_ID_063",
                "resourceGroupId": null,
                "title": "Example Actor 10",
                "username": "example-user",
                "pictureUrl": "https://example.s3.amazonaws.com/actor-image.png",
                "actorPermissionLevel": "LIMITED_PERMISSIONS"
            },
            "runsStats": {
                "ABORTED": 6,
                "FAILED": 0,
                "SUCCEEDED": 207,
                "TIMED-OUT": 0,
                "TOTAL": 264,
                "RESULTS": 18117
            },
            "earningsStats": {
                "totalRevenueUsd": 310.14,
                "totalCostUsd": 6.41,
                "totalProfitUsd": 223.29
            },
            "usersStats": {
                "freeUsers": 39,
                "payingUsers": 20
            },
            "chargedResults": 9589,
            "currentPricingInfo": {
                "pricingModel": "PAY_PER_EVENT",
                "createdAt": "2026-02-26T08:01:12.905Z",
                "startedAt": "2026-02-26T08:01:12.905Z",
                "apifyMarginPercentage": 0.2,
                "isPriceChangeNotificationSuppressed": true,
                "reasonForChange": "Migration from Pay Per Result to Pay Per Event with apify-default-dataset-item event",
                "pricingPerEvent": {
                    "ACTOR_ID_067": {
                        "apify-default-dataset-item": {
                            "eventTitle": "result",
                            "eventDescription": "Single result in the default dataset.",
                            "isPrimaryEvent": true,
                            "eventTieredPricingUsd": {
                                "FREE": {
                                    "tieredEventPriceUsd": 0.005
                                },
                                "BRONZE": {
                                    "tieredEventPriceUsd": 0.004
                                },
                                "SILVER": {
                                    "tieredEventPriceUsd": 0.003
                                },
                                "GOLD": {
                                    "tieredEventPriceUsd": 0.002
                                },
                                "PLATINUM": {
                                    "tieredEventPriceUsd": 0.002
                                },
                                "DIAMOND": {
                                    "tieredEventPriceUsd": 0.002
                                }
                            }
                        }
                    }
                },
                "forceContainsSignificantPriceChange": false
            }
        },
        {
            "actor": {
                "_id": "ACTOR_ID_074",
                "isPublic": true,
                "isDeprecated": false,
                "featuredScore": 70,
                "notice": "UNDER_MAINTENANCE",
                "name": "actor-007",
                "userId": "ACTOR_ID_063",
                "resourceGroupId": null,
                "title": "Example Actor 11",
                "username": "example-user",
                "pictureUrl": "https://example.s3.amazonaws.com/actor-image.png",
                "actorPermissionLevel": "LIMITED_PERMISSIONS"
            },
            "runsStats": {},
            "earningsStats": {
                "totalRevenueUsd": 310.14,
                "totalCostUsd": 6.41,
                "totalProfitUsd": 223.29
            },
            "usersStats": {
                "freeUsers": 39,
                "payingUsers": 20
            },
            "chargedResults": 9589,
            "currentPricingInfo": {
                "minimalMaxTotalChargeUsd": null,
                "pricingModel": "PAY_PER_EVENT",
                "isPriceChangeNotificationSuppressed": false,
                "pricingPerEvent": {
                    "ACTOR_ID_067": {
                        "apify-actor-start": {
                            "eventTitle": "Actor Start",
                            "eventDescription": "Charged when the Actor starts running. Number of events charged depends on Actor memory (one event per GB, minimum one event).",
                            "isOneTimeEvent": true,
                            "eventPriceUsd": 0.00005
                        },
                        "apify-default-dataset-item": {
                            "eventTitle": "result",
                            "eventDescription": "Single result in the default dataset.",
                            "eventTieredPricingUsd": {
                                "GOLD": {
                                    "tieredEventPriceUsd": 0.00115
                                },
                                "PLATINUM": {
                                    "tieredEventPriceUsd": 0.00115
                                },
                                "DIAMOND": {
                                    "tieredEventPriceUsd": 0.00115
                                },
                                "SILVER": {
                                    "tieredEventPriceUsd": 0.00125
                                },
                                "BRONZE": {
                                    "tieredEventPriceUsd": 0.00135
                                },
                                "FREE": {
                                    "tieredEventPriceUsd": 0.0015
                                }
                            },
                            "isPrimaryEvent": true
                        }
                    }
                },
                "startedAt": "2026-03-30T07:55:34.499Z",
                "createdAt": "2026-03-30T07:55:34.928Z",
                "apifyMarginPercentage": 0.2
            }
        },
        {
            "actor": {
                "_id": "ACTOR_ID_075",
                "isPublic": true,
                "isDeprecated": false,
                "featuredScore": 70,
                "notice": "NONE",
                "name": "actor-007",
                "userId": "ACTOR_ID_063",
                "resourceGroupId": null,
                "title": "Example Actor 12",
                "username": "example-user",
                "pictureUrl": "https://example.s3.amazonaws.com/actor-image.png",
                "actorPermissionLevel": "LIMITED_PERMISSIONS"
            },
            "runsStats": {
                "ABORTED": 6,
                "FAILED": 0,
                "SUCCEEDED": 207,
                "TIMED-OUT": 0,
                "TOTAL": 264,
                "RESULTS": 18117
            },
            "earningsStats": {
                "totalRevenueUsd": 310.14,
                "totalCostUsd": 6.41,
                "totalProfitUsd": 223.29
            },
            "usersStats": {
                "freeUsers": 39,
                "payingUsers": 20
            },
            "chargedResults": 9589,
            "currentPricingInfo": {
                "pricePerUnitUsd": 7,
                "trialMinutes": 4320,
                "pricingModel": "FLAT_PRICE_PER_MONTH",
                "isPriceChangeNotificationSuppressed": false,
                "reasonForChange": "The price is increasing to support the ongoing maintenance of the project. If you have any issue with the pricing please contact us at example-user@proton.me",
                "startedAt": "2026-01-22T11:10:35.655Z",
                "createdAt": "2026-01-08T11:10:35.894Z",
                "apifyMarginPercentage": 0.2,
                "notifiedAboutFutureChangeAt": "2026-01-08T11:10:56.396Z"
            }
        },
        {
            "actor": {
                "_id": "ACTOR_ID_076",
                "isPublic": true,
                "isDeprecated": false,
                "featuredScore": 70,
                "notice": "NONE",
                "name": "actor-007",
                "userId": "ACTOR_ID_063",
                "resourceGroupId": null,
                "title": "Example Actor 13",
                "username": "example-user",
                "pictureUrl": "https://example.s3.amazonaws.com/actor-image.png",
                "actorPermissionLevel": "LIMITED_PERMISSIONS"
            },
            "runsStats": {
                "ABORTED": 6,
                "FAILED": 0,
                "SUCCEEDED": 207,
                "TIMED-OUT": 0,
                "TOTAL": 264,
                "RESULTS": 18117
            },
            "earningsStats": {
                "totalRevenueUsd": 310.14,
                "totalCostUsd": 6.41,
                "totalProfitUsd": 223.29
            },
            "usersStats": {
                "freeUsers": 39,
                "payingUsers": 20
            },
            "chargedResults": 9589,
            "currentPricingInfo": {
                "pricingModel": "PAY_PER_EVENT",
                "createdAt": "2026-02-26T08:01:12.927Z",
                "startedAt": "2026-02-26T08:01:12.927Z",
                "apifyMarginPercentage": 0.2,
                "isPriceChangeNotificationSuppressed": true,
                "reasonForChange": "Migration from Pay Per Result to Pay Per Event with apify-default-dataset-item event",
                "pricingPerEvent": {
                    "ACTOR_ID_067": {
                        "apify-default-dataset-item": {
                            "eventTitle": "result",
                            "eventDescription": "Single result in the default dataset.",
                            "isPrimaryEvent": true,
                            "eventTieredPricingUsd": {
                                "FREE": {
                                    "tieredEventPriceUsd": 0.005
                                },
                                "BRONZE": {
                                    "tieredEventPriceUsd": 0.004
                                },
                                "SILVER": {
                                    "tieredEventPriceUsd": 0.003
                                },
                                "GOLD": {
                                    "tieredEventPriceUsd": 0.002
                                },
                                "PLATINUM": {
                                    "tieredEventPriceUsd": 0.002
                                },
                                "DIAMOND": {
                                    "tieredEventPriceUsd": 0.002
                                }
                            }
                        }
                    }
                },
                "forceContainsSignificantPriceChange": false
            }
        },
        {
            "actor": {
                "_id": "ACTOR_ID_077",
                "isPublic": true,
                "isDeprecated": false,
                "featuredScore": 70,
                "notice": "NONE",
                "name": "actor-008",
                "userId": "ACTOR_ID_063",
                "resourceGroupId": null,
                "title": "Example Actor 14",
                "username": "example-user",
                "pictureUrl": "https://example.s3.amazonaws.com/actor-image.png",
                "actorPermissionLevel": "LIMITED_PERMISSIONS"
            },
            "runsStats": {
                "ABORTED": 6,
                "FAILED": 0,
                "SUCCEEDED": 207,
                "TIMED-OUT": 0,
                "TOTAL": 264,
                "RESULTS": 18117
            },
            "earningsStats": {
                "totalRevenueUsd": 310.14,
                "totalCostUsd": 6.41,
                "totalProfitUsd": 223.29
            },
            "usersStats": {
                "freeUsers": 39,
                "payingUsers": 20
            },
            "chargedResults": 9589,
            "currentPricingInfo": {
                "pricePerUnitUsd": 9,
                "trialMinutes": 120,
                "pricingModel": "FLAT_PRICE_PER_MONTH",
                "isPriceChangeNotificationSuppressed": false,
                "reasonForChange": "The price is increasing to cover the cost of maintainer of the API. We are also releasing more endpoints for threads.com. Let me know if you have some suggestion mail me at example-user@proton.me",
                "startedAt": "2026-01-26T14:23:31.579Z",
                "createdAt": "2026-01-12T14:23:32.008Z",
                "apifyMarginPercentage": 0.2,
                "notifiedAboutFutureChangeAt": "2026-01-12T14:23:52.656Z"
            }
        },
        {
            "actor": {
                "_id": "ACTOR_ID_078",
                "isPublic": true,
                "isDeprecated": false,
                "featuredScore": 70,
                "notice": "NONE",
                "name": "actor-008",
                "userId": "ACTOR_ID_063",
                "resourceGroupId": null,
                "title": "Example Actor 15",
                "username": "example-user",
                "actorPermissionLevel": "LIMITED_PERMISSIONS",
                "pictureUrl": "https://example.s3.amazonaws.com/actor-image.png"
            },
            "runsStats": {
                "ABORTED": 6,
                "FAILED": 0,
                "SUCCEEDED": 207,
                "TIMED-OUT": 0,
                "TOTAL": 264,
                "RESULTS": 18117
            },
            "earningsStats": {
                "totalRevenueUsd": 310.14,
                "totalCostUsd": 6.41,
                "totalProfitUsd": 223.29
            },
            "usersStats": {
                "freeUsers": 39,
                "payingUsers": 20
            },
            "chargedResults": 9589,
            "currentPricingInfo": {
                "pricePerUnitUsd": 10,
                "trialMinutes": 1440,
                "pricingModel": "FLAT_PRICE_PER_MONTH",
                "isPriceChangeNotificationSuppressed": false,
                "startedAt": "2025-08-20T00:00:00.000Z",
                "createdAt": "2025-08-06T06:20:10.250Z",
                "apifyMarginPercentage": 0.2,
                "notifiedAboutFutureChangeAt": "2025-08-06T06:20:30.532Z",
                "notifiedAboutChangeAt": "2025-08-20T00:05:18.405Z"
            }
        },
        {
            "actor": {
                "_id": "ACTOR_ID_079",
                "isPublic": true,
                "isDeprecated": true,
                "featuredScore": 70,
                "notice": "NONE",
                "name": "actor-008",
                "userId": "ACTOR_ID_063",
                "resourceGroupId": null,
                "title": "Example Actor 16",
                "username": "example-user",
                "actorPermissionLevel": "LIMITED_PERMISSIONS",
                "pictureUrl": "https://example.s3.amazonaws.com/actor-image.png"
            },
            "runsStats": {},
            "earningsStats": {
                "totalRevenueUsd": 310.14,
                "totalCostUsd": 6.41,
                "totalProfitUsd": 223.29
            },
            "usersStats": {
                "freeUsers": 39,
                "payingUsers": 20
            },
            "chargedResults": 9589,
            "currentPricingInfo": {
                "pricingModel": "FREE",
                "createdAt": "2025-12-14T15:34:24.194Z",
                "startedAt": "2025-12-28T15:34:24.873Z",
                "apifyMarginPercentage": 0,
                "notifiedAboutFutureChangeAt": "2025-12-14T15:34:44.382Z"
            }
        },
        {
            "actor": {
                "_id": "ACTOR_ID_080",
                "isPublic": true,
                "isDeprecated": false,
                "featuredScore": 70,
                "notice": "UNDER_MAINTENANCE",
                "name": "actor-008",
                "userId": "ACTOR_ID_063",
                "resourceGroupId": null,
                "title": "Example Actor 17",
                "username": "example-user",
                "actorPermissionLevel": "LIMITED_PERMISSIONS",
                "pictureUrl": "https://example.s3.amazonaws.com/actor-image.png"
            },
            "runsStats": {},
            "earningsStats": {
                "totalRevenueUsd": 310.14,
                "totalCostUsd": 6.41,
                "totalProfitUsd": 223.29
            },
            "usersStats": {
                "freeUsers": 39,
                "payingUsers": 20
            },
            "chargedResults": 9589,
            "currentPricingInfo": {
                "pricePerUnitUsd": 10,
                "trialMinutes": 1440,
                "pricingModel": "FLAT_PRICE_PER_MONTH",
                "isPriceChangeNotificationSuppressed": false,
                "startedAt": "2025-08-20T00:00:00.000Z",
                "createdAt": "2025-08-06T06:19:39.927Z",
                "apifyMarginPercentage": 0.2,
                "notifiedAboutFutureChangeAt": "2025-08-06T06:20:00.207Z",
                "notifiedAboutChangeAt": "2025-08-20T00:05:18.445Z"
            }
        },
        {
            "actor": {
                "_id": "ACTOR_ID_081",
                "isPublic": true,
                "isDeprecated": false,
                "featuredScore": 70,
                "notice": "NONE",
                "name": "actor-009",
                "userId": "ACTOR_ID_063",
                "resourceGroupId": null,
                "title": "Example Actor 18",
                "username": "example-user",
                "actorPermissionLevel": "LIMITED_PERMISSIONS",
                "pictureUrl": "https://example.s3.amazonaws.com/actor-image.png"
            },
            "runsStats": {},
            "earningsStats": {
                "totalRevenueUsd": 310.14,
                "totalCostUsd": 6.41,
                "totalProfitUsd": 223.29
            },
            "usersStats": {
                "freeUsers": 39,
                "payingUsers": 20
            },
            "chargedResults": 9589,
            "currentPricingInfo": {
                "pricePerUnitUsd": 10,
                "trialMinutes": 1440,
                "pricingModel": "FLAT_PRICE_PER_MONTH",
                "isPriceChangeNotificationSuppressed": false,
                "startedAt": "2025-08-20T00:00:00.000Z",
                "createdAt": "2025-08-06T06:21:10.321Z",
                "apifyMarginPercentage": 0.2,
                "notifiedAboutFutureChangeAt": "2025-08-06T06:21:30.578Z",
                "notifiedAboutChangeAt": "2025-08-20T00:05:18.466Z"
            }
        },
        {
            "actor": {
                "_id": "ACTOR_ID_082",
                "isPublic": true,
                "isDeprecated": false,
                "featuredScore": 70,
                "notice": "NONE",
                "name": "actor-009",
                "userId": "ACTOR_ID_063",
                "resourceGroupId": null,
                "title": "Example Actor 19",
                "username": "example-user",
                "actorPermissionLevel": "LIMITED_PERMISSIONS",
                "pictureUrl": "https://example.s3.amazonaws.com/actor-image.png"
            },
            "runsStats": {},
            "earningsStats": {
                "totalRevenueUsd": 310.14,
                "totalCostUsd": 6.41,
                "totalProfitUsd": 223.29
            },
            "usersStats": {
                "freeUsers": 39,
                "payingUsers": 20
            },
            "chargedResults": 9589,
            "currentPricingInfo": {
                "pricePerUnitUsd": 10,
                "trialMinutes": 1440,
                "pricingModel": "FLAT_PRICE_PER_MONTH",
                "isPriceChangeNotificationSuppressed": false,
                "startedAt": "2025-08-20T00:00:00.000Z",
                "createdAt": "2025-08-06T06:21:35.338Z",
                "apifyMarginPercentage": 0.2,
                "notifiedAboutFutureChangeAt": "2025-08-06T06:21:55.517Z",
                "notifiedAboutChangeAt": "2025-08-20T00:05:18.485Z"
            }
        },
        {
            "actor": {
                "_id": "ACTOR_ID_083",
                "isPublic": true,
                "isDeprecated": true,
                "featuredScore": 70,
                "notice": "UNDER_MAINTENANCE",
                "name": "actor-009",
                "userId": "ACTOR_ID_063",
                "resourceGroupId": null,
                "title": "Example Actor 20",
                "username": "example-user",
                "actorPermissionLevel": "FULL_PERMISSIONS",
                "pictureUrl": "https://example.s3.amazonaws.com/actor-image.png"
            },
            "runsStats": {},
            "earningsStats": {
                "totalRevenueUsd": 310.14,
                "totalCostUsd": 6.41,
                "totalProfitUsd": 223.29
            },
            "usersStats": {
                "freeUsers": 39,
                "payingUsers": 20
            },
            "chargedResults": 9589,
            "currentPricingInfo": {
                "pricingModel": "FREE",
                "createdAt": "2025-12-14T15:35:20.826Z",
                "startedAt": "2025-12-28T15:35:21.864Z",
                "apifyMarginPercentage": 0,
                "notifiedAboutFutureChangeAt": "2025-12-14T15:35:40.966Z"
            }
        },
        {
            "actor": {
                "_id": "ACTOR_ID_084",
                "isPublic": true,
                "isDeprecated": false,
                "featuredScore": 70,
                "notice": "NONE",
                "name": "actor-009",
                "userId": "ACTOR_ID_063",
                "resourceGroupId": null,
                "title": "Example Actor 21",
                "username": "example-user",
                "actorPermissionLevel": "LIMITED_PERMISSIONS",
                "pictureUrl": null
            },
            "runsStats": {},
            "earningsStats": {
                "totalRevenueUsd": 310.14,
                "totalCostUsd": 6.41,
                "totalProfitUsd": 223.29
            },
            "usersStats": {
                "freeUsers": 39,
                "payingUsers": 20
            },
            "chargedResults": 9589,
            "currentPricingInfo": {
                "pricingModel": "PAY_PER_EVENT",
                "createdAt": "2026-02-26T08:01:12.909Z",
                "startedAt": "2026-02-26T08:01:12.909Z",
                "apifyMarginPercentage": 0.2,
                "isPriceChangeNotificationSuppressed": true,
                "reasonForChange": "Migration from Pay Per Result to Pay Per Event with apify-default-dataset-item event",
                "pricingPerEvent": {
                    "ACTOR_ID_067": {
                        "apify-default-dataset-item": {
                            "eventTitle": "result",
                            "eventDescription": "Single result in the default dataset.",
                            "isPrimaryEvent": true,
                            "eventTieredPricingUsd": {
                                "GOLD": {
                                    "tieredEventPriceUsd": 0.002
                                },
                                "PLATINUM": {
                                    "tieredEventPriceUsd": 0.002
                                },
                                "DIAMOND": {
                                    "tieredEventPriceUsd": 0.002
                                },
                                "SILVER": {
                                    "tieredEventPriceUsd": 0.003
                                },
                                "BRONZE": {
                                    "tieredEventPriceUsd": 0.004
                                },
                                "FREE": {
                                    "tieredEventPriceUsd": 0.005
                                }
                            }
                        }
                    }
                },
                "forceContainsSignificantPriceChange": false
            }
        },
        {
            "actor": {
                "_id": "ACTOR_ID_085",
                "isPublic": true,
                "isDeprecated": true,
                "featuredScore": 70,
                "notice": "NONE",
                "name": "actor-010",
                "userId": "ACTOR_ID_063",
                "resourceGroupId": null,
                "title": "Example Actor 22",
                "username": "example-user",
                "actorPermissionLevel": "LIMITED_PERMISSIONS",
                "pictureUrl": "https://example.s3.amazonaws.com/actor-image.png"
            },
            "runsStats": {
                "ABORTED": 6,
                "FAILED": 0,
                "SUCCEEDED": 207,
                "TIMED-OUT": 0,
                "TOTAL": 264,
                "RESULTS": 18117
            },
            "earningsStats": {
                "totalRevenueUsd": 310.14,
                "totalCostUsd": 6.41,
                "totalProfitUsd": 223.29
            },
            "usersStats": {
                "freeUsers": 39,
                "payingUsers": 20
            },
            "chargedResults": 9589,
            "currentPricingInfo": {
                "minimalMaxTotalChargeUsd": null,
                "pricingModel": "PAY_PER_EVENT",
                "isPriceChangeNotificationSuppressed": false,
                "reasonForChange": "We reviewed and optimized our entire pricing structure to offer better value at every tier. Our goal is to make the actor more affordable and easier to scale while maintaining the same quality and performance",
                "pricingPerEvent": {
                    "ACTOR_ID_067": {
                        "result": {
                            "eventTitle": "Result",
                            "eventDescription": "Cost per result item returned",
                            "eventTieredPricingUsd": {
                                "FREE": {
                                    "tieredEventPriceUsd": 0.00175
                                },
                                "BRONZE": {
                                    "tieredEventPriceUsd": 0.0015
                                },
                                "SILVER": {
                                    "tieredEventPriceUsd": 0.00125
                                },
                                "GOLD": {
                                    "tieredEventPriceUsd": 0.001
                                },
                                "PLATINUM": {
                                    "tieredEventPriceUsd": 0.001
                                },
                                "DIAMOND": {
                                    "tieredEventPriceUsd": 0.001
                                }
                            }
                        },
                        "enriched-profile": {
                            "eventTitle": "Add-on: Enriched profile",
                            "eventDescription": "Enriched profiles with additional details",
                            "eventTieredPricingUsd": {
                                "FREE": {
                                    "tieredEventPriceUsd": 0.002
                                },
                                "BRONZE": {
                                    "tieredEventPriceUsd": 0.00175
                                },
                                "SILVER": {
                                    "tieredEventPriceUsd": 0.0015
                                },
                                "GOLD": {
                                    "tieredEventPriceUsd": 0.00125
                                },
                                "PLATINUM": {
                                    "tieredEventPriceUsd": 0.00125
                                },
                                "DIAMOND": {
                                    "tieredEventPriceUsd": 0.00125
                                }
                            }
                        },
                        "apify-actor-start": {
                            "eventTitle": "Actor Start",
                            "eventDescription": "Charged when the Actor starts running. Number of events charged depends on Actor memory (one event per GB, minimum one event).",
                            "eventPriceUsd": 0.00005,
                            "isOneTimeEvent": true
                        }
                    }
                },
                "startedAt": "2026-02-18T16:09:19.688Z",
                "createdAt": "2026-02-18T16:09:19.688Z",
                "apifyMarginPercentage": 0.2,
                "notifiedAboutFutureChangeAt": "2025-11-14T06:03:27.378Z"
            }
        },
        {
            "actor": {
                "_id": "ACTOR_ID_086",
                "isPublic": true,
                "isDeprecated": true,
                "featuredScore": 70,
                "notice": "NONE",
                "name": "actor-010",
                "userId": "ACTOR_ID_063",
                "resourceGroupId": null,
                "title": "Example Actor 23",
                "username": "example-user",
                "actorPermissionLevel": "LIMITED_PERMISSIONS",
                "pictureUrl": "https://example.s3.amazonaws.com/actor-image.png"
            },
            "runsStats": {
                "ABORTED": 6,
                "FAILED": 0,
                "SUCCEEDED": 207,
                "TIMED-OUT": 0,
                "TOTAL": 264,
                "RESULTS": 18117
            },
            "earningsStats": {
                "totalRevenueUsd": 310.14,
                "totalCostUsd": 6.41,
                "totalProfitUsd": 223.29
            },
            "usersStats": {
                "freeUsers": 39,
                "payingUsers": 20
            },
            "chargedResults": 9589,
            "currentPricingInfo": {
                "minimalMaxTotalChargeUsd": null,
                "pricingModel": "PAY_PER_EVENT",
                "isPriceChangeNotificationSuppressed": false,
                "reasonForChange": "We reviewed and optimized our entire pricing structure to offer better value at every tier. Our goal is to make the actor more affordable and easier to scale while maintaining the same quality and performance",
                "pricingPerEvent": {
                    "ACTOR_ID_067": {
                        "result": {
                            "eventTitle": "Result:",
                            "eventDescription": "Price to produce result",
                            "eventTieredPricingUsd": {
                                "FREE": {
                                    "tieredEventPriceUsd": 0.00175
                                },
                                "BRONZE": {
                                    "tieredEventPriceUsd": 0.0015
                                },
                                "SILVER": {
                                    "tieredEventPriceUsd": 0.00125
                                },
                                "GOLD": {
                                    "tieredEventPriceUsd": 0.001
                                },
                                "PLATINUM": {
                                    "tieredEventPriceUsd": 0.001
                                },
                                "DIAMOND": {
                                    "tieredEventPriceUsd": 0.001
                                }
                            }
                        },
                        "enriched-profile": {
                            "eventTitle": "Add-on: Enriched profile:",
                            "eventDescription": "Enriched profile with additional detail see docs for reference",
                            "eventTieredPricingUsd": {
                                "FREE": {
                                    "tieredEventPriceUsd": 0.002
                                },
                                "BRONZE": {
                                    "tieredEventPriceUsd": 0.00175
                                },
                                "SILVER": {
                                    "tieredEventPriceUsd": 0.0015
                                },
                                "GOLD": {
                                    "tieredEventPriceUsd": 0.00125
                                },
                                "PLATINUM": {
                                    "tieredEventPriceUsd": 0.00125
                                },
                                "DIAMOND": {
                                    "tieredEventPriceUsd": 0.00125
                                }
                            }
                        },
                        "apify-actor-start": {
                            "eventTitle": "Actor Start",
                            "eventDescription": "Charged when the Actor starts running. Number of events charged depends on Actor memory (one event per GB, minimum one event).",
                            "eventPriceUsd": 0.00005,
                            "isOneTimeEvent": true
                        }
                    }
                },
                "startedAt": "2026-03-06T06:58:29.679Z",
                "createdAt": "2026-03-06T06:58:29.679Z",
                "apifyMarginPercentage": 0.2,
                "notifiedAboutFutureChangeAt": "2025-11-14T05:55:17.986Z"
            }
        },
        {
            "actor": {
                "_id": "ACTOR_ID_087",
                "isPublic": true,
                "isDeprecated": true,
                "featuredScore": 70,
                "notice": "NONE",
                "name": "actor-010",
                "userId": "ACTOR_ID_063",
                "resourceGroupId": null,
                "title": "Example Actor 24",
                "username": "example-user",
                "actorPermissionLevel": "LIMITED_PERMISSIONS",
                "pictureUrl": "https://example.s3.amazonaws.com/actor-image.png"
            },
            "runsStats": {
                "ABORTED": 6,
                "FAILED": 0,
                "SUCCEEDED": 207,
                "TIMED-OUT": 0,
                "TOTAL": 264,
                "RESULTS": 18117
            },
            "earningsStats": {
                "totalRevenueUsd": 310.14,
                "totalCostUsd": 6.41,
                "totalProfitUsd": 223.29
            },
            "usersStats": {
                "freeUsers": 39,
                "payingUsers": 20
            },
            "chargedResults": 9589,
            "currentPricingInfo": {
                "minimalMaxTotalChargeUsd": null,
                "pricingModel": "PAY_PER_EVENT",
                "isPriceChangeNotificationSuppressed": true,
                "pricingPerEvent": {
                    "ACTOR_ID_067": {
                        "result": {
                            "eventTitle": "Result:",
                            "eventDescription": "Price to produce results",
                            "isOneTimeEvent": false,
                            "eventTieredPricingUsd": {
                                "FREE": {
                                    "tieredEventPriceUsd": 0.00175
                                },
                                "BRONZE": {
                                    "tieredEventPriceUsd": 0.0015
                                },
                                "SILVER": {
                                    "tieredEventPriceUsd": 0.00125
                                },
                                "GOLD": {
                                    "tieredEventPriceUsd": 0.001
                                },
                                "PLATINUM": {
                                    "tieredEventPriceUsd": 0.001
                                },
                                "DIAMOND": {
                                    "tieredEventPriceUsd": 0.001
                                }
                            }
                        },
                        "enriched-profile": {
                            "eventTitle": "Add-On: Enriched profile",
                            "eventDescription": "Enriched profile with additional details.see docs for reference",
                            "isOneTimeEvent": false,
                            "eventTieredPricingUsd": {
                                "FREE": {
                                    "tieredEventPriceUsd": 0.002
                                },
                                "BRONZE": {
                                    "tieredEventPriceUsd": 0.00175
                                },
                                "SILVER": {
                                    "tieredEventPriceUsd": 0.0015
                                },
                                "GOLD": {
                                    "tieredEventPriceUsd": 0.00125
                                },
                                "PLATINUM": {
                                    "tieredEventPriceUsd": 0.00125
                                },
                                "DIAMOND": {
                                    "tieredEventPriceUsd": 0.00125
                                }
                            }
                        },
                        "apify-actor-start": {
                            "eventTitle": "Actor Start",
                            "eventDescription": "Charged when the Actor starts running. Number of events charged depends on Actor memory (one event per GB, minimum one event).",
                            "isOneTimeEvent": true,
                            "eventPriceUsd": 0.00005
                        }
                    }
                },
                "createdAt": "2026-03-06T06:59:52.337Z",
                "startedAt": "2026-03-06T06:59:52.337Z",
                "apifyMarginPercentage": 0.2
            }
        },
        {
            "actor": {
                "_id": "ACTOR_ID_002",
                "isPublic": true,
                "isDeprecated": false,
                "featuredScore": 70,
                "notice": "NONE",
                "name": "actor-010",
                "userId": "ACTOR_ID_063",
                "resourceGroupId": null,
                "title": "Example Actor 25",
                "username": "example-user",
                "actorPermissionLevel": "LIMITED_PERMISSIONS",
                "pictureUrl": "https://example.s3.amazonaws.com/actor-image.png"
            },
            "runsStats": {
                "ABORTED": 6,
                "FAILED": 0,
                "SUCCEEDED": 207,
                "TIMED-OUT": 0,
                "TOTAL": 264,
                "RESULTS": 18117
            },
            "earningsStats": {
                "totalRevenueUsd": 310.14,
                "totalCostUsd": 6.41,
                "totalProfitUsd": 223.29
            },
            "usersStats": {
                "freeUsers": 39,
                "payingUsers": 20
            },
            "chargedResults": 9589,
            "currentPricingInfo": {
                "minimalMaxTotalChargeUsd": null,
                "pricingModel": "PAY_PER_EVENT",
                "isPriceChangeNotificationSuppressed": true,
                "pricingPerEvent": {
                    "ACTOR_ID_067": {
                        "apify-actor-start": {
                            "eventTitle": "Actor Start",
                            "eventDescription": "Charged when the Actor starts running. Number of events charged depends on Actor memory (one event per GB, minimum one event).",
                            "isOneTimeEvent": true,
                            "eventTieredPricingUsd": {
                                "FREE": {
                                    "tieredEventPriceUsd": 0.005
                                },
                                "BRONZE": {
                                    "tieredEventPriceUsd": 0.004
                                },
                                "SILVER": {
                                    "tieredEventPriceUsd": 0.003
                                },
                                "GOLD": {
                                    "tieredEventPriceUsd": 0.002
                                },
                                "PLATINUM": {
                                    "tieredEventPriceUsd": 0.002
                                },
                                "DIAMOND": {
                                    "tieredEventPriceUsd": 0.002
                                }
                            }
                        },
                        "apify-default-dataset-item": {
                            "eventTitle": "result",
                            "eventDescription": "Cost per item collected. Each unit covers processing, cleaning, analysis, and storage.",
                            "isOneTimeEvent": false,
                            "eventTieredPricingUsd": {
                                "FREE": {
                                    "tieredEventPriceUsd": 0.004
                                },
                                "BRONZE": {
                                    "tieredEventPriceUsd": 0.003
                                },
                                "SILVER": {
                                    "tieredEventPriceUsd": 0.0025
                                },
                                "GOLD": {
                                    "tieredEventPriceUsd": 0.002
                                },
                                "PLATINUM": {
                                    "tieredEventPriceUsd": 0.002
                                },
                                "DIAMOND": {
                                    "tieredEventPriceUsd": 0.002
                                }
                            }
                        },
                        "enriched-profile": {
                            "eventTitle": "Add-on: Enriched profile",
                            "eventDescription": "Add additional data for each profile scraped",
                            "isOneTimeEvent": false,
                            "eventTieredPricingUsd": {
                                "FREE": {
                                    "tieredEventPriceUsd": 0.003
                                },
                                "BRONZE": {
                                    "tieredEventPriceUsd": 0.002
                                },
                                "SILVER": {
                                    "tieredEventPriceUsd": 0.00175
                                },
                                "GOLD": {
                                    "tieredEventPriceUsd": 0.0015
                                },
                                "PLATINUM": {
                                    "tieredEventPriceUsd": 0.0015
                                },
                                "DIAMOND": {
                                    "tieredEventPriceUsd": 0.0015
                                }
                            }
                        }
                    }
                },
                "createdAt": "2026-03-10T20:08:51.093Z",
                "startedAt": "2026-03-10T20:08:51.093Z",
                "apifyMarginPercentage": 0.2
            }
        },
        {
            "actor": {
                "_id": "ACTOR_ID_088",
                "isPublic": true,
                "isDeprecated": false,
                "featuredScore": 70,
                "notice": "NONE",
                "name": "actor-011",
                "userId": "ACTOR_ID_063",
                "resourceGroupId": null,
                "title": "Example Actor 02",
                "username": "example-user",
                "actorPermissionLevel": "LIMITED_PERMISSIONS",
                "pictureUrl": "https://example.s3.amazonaws.com/actor-image.png"
            },
            "runsStats": {
                "ABORTED": 6,
                "FAILED": 0,
                "SUCCEEDED": 207,
                "TIMED-OUT": 0,
                "TOTAL": 264,
                "RESULTS": 18117
            },
            "earningsStats": {
                "totalRevenueUsd": 310.14,
                "totalCostUsd": 6.41,
                "totalProfitUsd": 223.29
            },
            "usersStats": {
                "freeUsers": 39,
                "payingUsers": 20
            },
            "chargedResults": 9589,
            "currentPricingInfo": {
                "minimalMaxTotalChargeUsd": null,
                "pricingModel": "PAY_PER_EVENT",
                "isPriceChangeNotificationSuppressed": false,
                "reasonForChange": "The price is increasing to continue the support of the project. The previous pricing wasn't sustainable. Mail on example-user@proton.me if you have any issue with the pricing.",
                "pricingPerEvent": {
                    "ACTOR_ID_067": {
                        "apify-default-dataset-item": {
                            "eventTitle": "result",
                            "eventDescription": "Single result in the default dataset.",
                            "isOneTimeEvent": false,
                            "eventTieredPricingUsd": {
                                "FREE": {
                                    "tieredEventPriceUsd": 0.0035
                                },
                                "BRONZE": {
                                    "tieredEventPriceUsd": 0.003
                                },
                                "SILVER": {
                                    "tieredEventPriceUsd": 0.0025
                                },
                                "GOLD": {
                                    "tieredEventPriceUsd": 0.002
                                },
                                "PLATINUM": {
                                    "tieredEventPriceUsd": 0.002
                                },
                                "DIAMOND": {
                                    "tieredEventPriceUsd": 0.002
                                }
                            },
                            "isPrimaryEvent": true
                        }
                    }
                },
                "startedAt": "2026-03-05T07:25:35.537Z",
                "createdAt": "2026-02-19T07:25:38.767Z",
                "apifyMarginPercentage": 0.2,
                "notifiedAboutFutureChangeAt": "2026-02-19T07:25:59.488Z"
            }
        },
        {
            "actor": {
                "_id": "ACTOR_ID_089",
                "isPublic": true,
                "isDeprecated": false,
                "featuredScore": 70,
                "notice": "NONE",
                "name": "actor-011",
                "userId": "ACTOR_ID_063",
                "resourceGroupId": null,
                "title": "Example Actor 26",
                "username": "example-user",
                "actorPermissionLevel": "LIMITED_PERMISSIONS",
                "pictureUrl": "https://example.s3.amazonaws.com/actor-image.png"
            },
            "runsStats": {
                "ABORTED": 6,
                "FAILED": 0,
                "SUCCEEDED": 207,
                "TIMED-OUT": 0,
                "TOTAL": 264,
                "RESULTS": 18117
            },
            "earningsStats": {
                "totalRevenueUsd": 310.14,
                "totalCostUsd": 6.41,
                "totalProfitUsd": 223.29
            },
            "usersStats": {
                "freeUsers": 39,
                "payingUsers": 20
            },
            "chargedResults": 9589,
            "currentPricingInfo": {
                "minimalMaxTotalChargeUsd": null,
                "pricingModel": "PAY_PER_EVENT",
                "isPriceChangeNotificationSuppressed": false,
                "pricingPerEvent": {
                    "ACTOR_ID_067": {
                        "apify-actor-start": {
                            "eventTitle": "Actor Start",
                            "eventDescription": "Charged when the Actor starts running. Number of events charged depends on Actor memory (one event per GB, minimum one event).",
                            "eventPriceUsd": 0.00005
                        },
                        "result": {
                            "eventTitle": "Result",
                            "eventDescription": "Price to get the tagged / mentioned posts",
                            "eventTieredPricingUsd": {
                                "GOLD": {
                                    "tieredEventPriceUsd": 0.00125
                                },
                                "PLATINUM": {
                                    "tieredEventPriceUsd": 0.00125
                                },
                                "DIAMOND": {
                                    "tieredEventPriceUsd": 0.00125
                                },
                                "SILVER": {
                                    "tieredEventPriceUsd": 0.0015
                                },
                                "BRONZE": {
                                    "tieredEventPriceUsd": 0.00175
                                },
                                "FREE": {
                                    "tieredEventPriceUsd": 0.002
                                }
                            }
                        }
                    }
                },
                "startedAt": "2025-11-09T09:57:20.289Z",
                "createdAt": "2025-11-09T09:57:21.405Z",
                "apifyMarginPercentage": 0.2
            }
        },
        {
            "actor": {
                "_id": "ACTOR_ID_090",
                "isPublic": true,
                "isDeprecated": false,
                "featuredScore": 70,
                "notice": "NONE",
                "name": "actor-011",
                "userId": "ACTOR_ID_063",
                "resourceGroupId": null,
                "title": "Example Actor 27",
                "username": "example-user",
                "actorPermissionLevel": "LIMITED_PERMISSIONS",
                "pictureUrl": "https://example.s3.amazonaws.com/actor-image.png"
            },
            "runsStats": {
                "ABORTED": 6,
                "FAILED": 0,
                "SUCCEEDED": 207,
                "TIMED-OUT": 0,
                "TOTAL": 264,
                "RESULTS": 18117
            },
            "earningsStats": {
                "totalRevenueUsd": 310.14,
                "totalCostUsd": 6.41,
                "totalProfitUsd": 223.29
            },
            "usersStats": {
                "freeUsers": 39,
                "payingUsers": 20
            },
            "chargedResults": 9589,
            "currentPricingInfo": {
                "minimalMaxTotalChargeUsd": null,
                "pricingModel": "PAY_PER_EVENT",
                "isPriceChangeNotificationSuppressed": false,
                "pricingPerEvent": {
                    "ACTOR_ID_067": {
                        "apify-actor-start": {
                            "eventTitle": "Actor Start",
                            "eventDescription": "Charged when the Actor starts running. Number of events charged depends on Actor memory (one event per GB, minimum one event).",
                            "eventPriceUsd": 0.00005
                        },
                        "result": {
                            "eventTitle": "Result",
                            "eventDescription": "Price to get comments",
                            "eventPriceUsd": 0.001
                        }
                    }
                },
                "startedAt": "2025-11-10T16:49:19.554Z",
                "createdAt": "2025-11-10T16:49:19.241Z",
                "apifyMarginPercentage": 0.2
            }
        },
        {
            "actor": {
                "_id": "ACTOR_ID_091",
                "isPublic": true,
                "isDeprecated": false,
                "featuredScore": 70,
                "notice": "NONE",
                "name": "actor-011",
                "userId": "ACTOR_ID_063",
                "resourceGroupId": null,
                "title": "Example Actor 28",
                "username": "example-user",
                "actorPermissionLevel": "LIMITED_PERMISSIONS",
                "pictureUrl": "https://example.s3.amazonaws.com/actor-image.png"
            },
            "runsStats": {},
            "earningsStats": {
                "totalRevenueUsd": 310.14,
                "totalCostUsd": 6.41,
                "totalProfitUsd": 223.29
            },
            "usersStats": {
                "freeUsers": 39,
                "payingUsers": 20
            },
            "chargedResults": 9589,
            "currentPricingInfo": {
                "minimalMaxTotalChargeUsd": null,
                "pricingModel": "PAY_PER_EVENT",
                "isPriceChangeNotificationSuppressed": false,
                "pricingPerEvent": {
                    "ACTOR_ID_067": {
                        "apify-actor-start": {
                            "eventTitle": "Actor Start",
                            "eventDescription": "Charged when the Actor starts running. Number of events charged depends on Actor memory (one event per GB, minimum one event).",
                            "isOneTimeEvent": true,
                            "eventPriceUsd": 0.00005
                        },
                        "result": {
                            "eventTitle": "Result Cost",
                            "eventDescription": "Price required for hashtag scraping",
                            "isOneTimeEvent": false,
                            "eventTieredPricingUsd": {
                                "FREE": {
                                    "tieredEventPriceUsd": 0.0015
                                },
                                "BRONZE": {
                                    "tieredEventPriceUsd": 0.001
                                },
                                "SILVER": {
                                    "tieredEventPriceUsd": 0.00075
                                },
                                "GOLD": {
                                    "tieredEventPriceUsd": 0.0005
                                },
                                "PLATINUM": {
                                    "tieredEventPriceUsd": 0.0005
                                },
                                "DIAMOND": {
                                    "tieredEventPriceUsd": 0.0005
                                }
                            }
                        }
                    }
                },
                "startedAt": "2025-12-10T08:11:32.371Z",
                "createdAt": "2025-12-10T08:11:33.289Z",
                "apifyMarginPercentage": 0.2
            }
        },
        {
            "actor": {
                "_id": "ACTOR_ID_092",
                "isPublic": true,
                "isDeprecated": false,
                "featuredScore": 70,
                "notice": "UNDER_MAINTENANCE",
                "name": "actor-012",
                "userId": "ACTOR_ID_063",
                "resourceGroupId": null,
                "title": "Example Actor 29",
                "username": "example-user",
                "actorPermissionLevel": "LIMITED_PERMISSIONS",
                "pictureUrl": "https://example.s3.amazonaws.com/actor-image.png"
            },
            "runsStats": {
                "ABORTED": 6,
                "FAILED": 0,
                "SUCCEEDED": 207,
                "TIMED-OUT": 0,
                "TOTAL": 264,
                "RESULTS": 18117
            },
            "earningsStats": {
                "totalRevenueUsd": 310.14,
                "totalCostUsd": 6.41,
                "totalProfitUsd": -0.0018753947894374532
            },
            "usersStats": {
                "freeUsers": 39,
                "payingUsers": 20
            },
            "chargedResults": 9589,
            "currentPricingInfo": {
                "minimalMaxTotalChargeUsd": null,
                "pricingModel": "PAY_PER_EVENT",
                "isPriceChangeNotificationSuppressed": false,
                "pricingPerEvent": {
                    "ACTOR_ID_067": {
                        "apify-actor-start": {
                            "eventTitle": "Actor Start",
                            "eventDescription": "Charged when the Actor starts running. Number of events charged depends on Actor memory (one event per GB, minimum one event).",
                            "isOneTimeEvent": true,
                            "eventPriceUsd": 0.00005
                        },
                        "result": {
                            "eventTitle": "Result",
                            "eventDescription": "Price for scraping follower or following",
                            "isOneTimeEvent": false,
                            "eventTieredPricingUsd": {
                                "GOLD": {
                                    "tieredEventPriceUsd": 0.00075
                                },
                                "PLATINUM": {
                                    "tieredEventPriceUsd": 0.00075
                                },
                                "DIAMOND": {
                                    "tieredEventPriceUsd": 0.00075
                                },
                                "SILVER": {
                                    "tieredEventPriceUsd": 0.001
                                },
                                "BRONZE": {
                                    "tieredEventPriceUsd": 0.00125
                                },
                                "FREE": {
                                    "tieredEventPriceUsd": 0.0015
                                }
                            }
                        },
                        "enriched-profile": {
                            "eventTitle": "Addon: Enrich Profile",
                            "eventDescription": "Add additional profile data for each follower",
                            "isOneTimeEvent": false,
                            "eventTieredPricingUsd": {
                                "GOLD": {
                                    "tieredEventPriceUsd": 0.0005
                                },
                                "PLATINUM": {
                                    "tieredEventPriceUsd": 0.0005
                                },
                                "DIAMOND": {
                                    "tieredEventPriceUsd": 0.0005
                                },
                                "SILVER": {
                                    "tieredEventPriceUsd": 0.00075
                                },
                                "BRONZE": {
                                    "tieredEventPriceUsd": 0.001
                                },
                                "FREE": {
                                    "tieredEventPriceUsd": 0.00125
                                }
                            }
                        }
                    }
                },
                "startedAt": "2025-12-11T06:16:41.993Z",
                "createdAt": "2025-12-11T06:16:42.854Z",
                "apifyMarginPercentage": 0.2
            }
        },
        {
            "actor": {
                "_id": "ACTOR_ID_093",
                "isPublic": true,
                "isDeprecated": false,
                "featuredScore": 70,
                "notice": "NONE",
                "name": "actor-012",
                "userId": "ACTOR_ID_063",
                "resourceGroupId": null,
                "title": "Example Actor 30",
                "username": "example-user",
                "actorPermissionLevel": "LIMITED_PERMISSIONS",
                "pictureUrl": "https://example.s3.amazonaws.com/actor-image.png"
            },
            "runsStats": {
                "ABORTED": 6,
                "FAILED": 0,
                "SUCCEEDED": 207,
                "TIMED-OUT": 0,
                "TOTAL": 264,
                "RESULTS": 18117
            },
            "earningsStats": {
                "totalRevenueUsd": 310.14,
                "totalCostUsd": 6.41,
                "totalProfitUsd": 223.29
            },
            "usersStats": {
                "freeUsers": 39,
                "payingUsers": 20
            },
            "chargedResults": 9589,
            "currentPricingInfo": {
                "minimalMaxTotalChargeUsd": null,
                "pricingModel": "PAY_PER_EVENT",
                "isPriceChangeNotificationSuppressed": false,
                "pricingPerEvent": {
                    "ACTOR_ID_067": {
                        "apify-actor-start": {
                            "eventTitle": "Actor Start",
                            "eventDescription": "Charged when the Actor starts running. Number of events charged depends on Actor memory (one event per GB, minimum one event).",
                            "isOneTimeEvent": true,
                            "eventPriceUsd": 0.00005
                        },
                        "apify-default-dataset-item": {
                            "eventTitle": "result",
                            "eventDescription": "Single result in the default dataset.",
                            "isOneTimeEvent": false,
                            "eventTieredPricingUsd": {
                                "GOLD": {
                                    "tieredEventPriceUsd": 0.00025
                                },
                                "PLATINUM": {
                                    "tieredEventPriceUsd": 0.00025
                                },
                                "DIAMOND": {
                                    "tieredEventPriceUsd": 0.00025
                                },
                                "SILVER": {
                                    "tieredEventPriceUsd": 0.0004
                                },
                                "BRONZE": {
                                    "tieredEventPriceUsd": 0.00055
                                },
                                "FREE": {
                                    "tieredEventPriceUsd": 0.0007
                                }
                            }
                        }
                    }
                },
                "startedAt": "2025-12-13T16:35:32.947Z",
                "createdAt": "2025-12-13T16:35:32.313Z",
                "apifyMarginPercentage": 0.2
            }
        },
        {
            "actor": {
                "_id": "ACTOR_ID_094",
                "isPublic": true,
                "isDeprecated": false,
                "featuredScore": 70,
                "notice": "NONE",
                "name": "actor-012",
                "userId": "ACTOR_ID_063",
                "resourceGroupId": null,
                "title": "Example Actor 31",
                "username": "example-user",
                "actorPermissionLevel": "LIMITED_PERMISSIONS",
                "pictureUrl": "https://example.s3.amazonaws.com/actor-image.png"
            },
            "runsStats": {
                "ABORTED": 6,
                "FAILED": 0,
                "SUCCEEDED": 207,
                "TIMED-OUT": 0,
                "TOTAL": 264,
                "RESULTS": 18117
            },
            "earningsStats": {
                "totalRevenueUsd": 310.14,
                "totalCostUsd": 6.41,
                "totalProfitUsd": 223.29
            },
            "usersStats": {
                "freeUsers": 39,
                "payingUsers": 20
            },
            "chargedResults": 9589,
            "currentPricingInfo": {
                "minimalMaxTotalChargeUsd": null,
                "pricingModel": "PAY_PER_EVENT",
                "isPriceChangeNotificationSuppressed": false,
                "pricingPerEvent": {
                    "ACTOR_ID_067": {
                        "apify-actor-start": {
                            "eventTitle": "Actor Start",
                            "eventDescription": "Charged when the Actor starts running. Number of events charged depends on Actor memory (one event per GB, minimum one event).",
                            "isOneTimeEvent": true,
                            "eventPriceUsd": 0.00005
                        },
                        "apify-default-dataset-item": {
                            "eventTitle": "result",
                            "eventDescription": "Single result in the default dataset.",
                            "eventTieredPricingUsd": {
                                "GOLD": {
                                    "tieredEventPriceUsd": 0.0002
                                },
                                "PLATINUM": {
                                    "tieredEventPriceUsd": 0.0002
                                },
                                "DIAMOND": {
                                    "tieredEventPriceUsd": 0.0002
                                },
                                "SILVER": {
                                    "tieredEventPriceUsd": 0.00035
                                },
                                "BRONZE": {
                                    "tieredEventPriceUsd": 0.0005
                                },
                                "FREE": {
                                    "tieredEventPriceUsd": 0.00065
                                }
                            }
                        }
                    }
                },
                "startedAt": "2025-12-13T16:44:01.572Z",
                "createdAt": "2025-12-13T16:44:00.890Z",
                "apifyMarginPercentage": 0.2
            }
        },
        {
            "actor": {
                "_id": "ACTOR_ID_095",
                "isPublic": true,
                "isDeprecated": false,
                "featuredScore": 70,
                "notice": "NONE",
                "name": "actor-012",
                "userId": "ACTOR_ID_063",
                "resourceGroupId": null,
                "title": "Example Actor 32",
                "username": "example-user",
                "actorPermissionLevel": "LIMITED_PERMISSIONS",
                "pictureUrl": "https://example.s3.amazonaws.com/actor-image.png"
            },
            "runsStats": {
                "ABORTED": 6,
                "FAILED": 0,
                "SUCCEEDED": 207,
                "TIMED-OUT": 0,
                "TOTAL": 264,
                "RESULTS": 18117
            },
            "earningsStats": {
                "totalRevenueUsd": 310.14,
                "totalCostUsd": 6.41,
                "totalProfitUsd": -0.000010084842637181284
            },
            "usersStats": {
                "freeUsers": 39,
                "payingUsers": 20
            },
            "chargedResults": 9589,
            "currentPricingInfo": {
                "minimalMaxTotalChargeUsd": null,
                "pricingModel": "PAY_PER_EVENT",
                "isPriceChangeNotificationSuppressed": false,
                "pricingPerEvent": {
                    "ACTOR_ID_067": {
                        "apify-actor-start": {
                            "eventTitle": "Actor Start",
                            "eventDescription": "Charged when the Actor starts running. Number of events charged depends on Actor memory (one event per GB, minimum one event).",
                            "isOneTimeEvent": true,
                            "eventPriceUsd": 0.00005
                        },
                        "apify-default-dataset-item": {
                            "eventTitle": "result",
                            "eventDescription": "Single result in the default dataset.",
                            "eventTieredPricingUsd": {
                                "GOLD": {
                                    "tieredEventPriceUsd": 0.00025
                                },
                                "PLATINUM": {
                                    "tieredEventPriceUsd": 0.00025
                                },
                                "DIAMOND": {
                                    "tieredEventPriceUsd": 0.00025
                                },
                                "SILVER": {
                                    "tieredEventPriceUsd": 0.0004
                                },
                                "BRONZE": {
                                    "tieredEventPriceUsd": 0.00055
                                },
                                "FREE": {
                                    "tieredEventPriceUsd": 0.0007
                                }
                            }
                        }
                    }
                },
                "startedAt": "2025-12-13T17:25:06.901Z",
                "createdAt": "2025-12-13T17:25:06.241Z",
                "apifyMarginPercentage": 0.2
            }
        },
        {
            "actor": {
                "_id": "ACTOR_ID_096",
                "isPublic": true,
                "isDeprecated": false,
                "featuredScore": 70,
                "notice": "NONE",
                "name": "actor-013",
                "userId": "ACTOR_ID_063",
                "resourceGroupId": null,
                "title": "Example Actor 33",
                "username": "example-user",
                "actorPermissionLevel": "LIMITED_PERMISSIONS",
                "pictureUrl": "https://example.s3.amazonaws.com/actor-image.png"
            },
            "runsStats": {
                "ABORTED": 6,
                "FAILED": 0,
                "SUCCEEDED": 207,
                "TIMED-OUT": 0,
                "TOTAL": 264,
                "RESULTS": 18117
            },
            "earningsStats": {
                "totalRevenueUsd": 310.14,
                "totalCostUsd": 6.41,
                "totalProfitUsd": 223.29
            },
            "usersStats": {
                "freeUsers": 39,
                "payingUsers": 20
            },
            "chargedResults": 9589,
            "currentPricingInfo": {
                "minimalMaxTotalChargeUsd": null,
                "pricingModel": "PAY_PER_EVENT",
                "isPriceChangeNotificationSuppressed": false,
                "pricingPerEvent": {
                    "ACTOR_ID_067": {
                        "apify-actor-start": {
                            "eventTitle": "Actor Start",
                            "eventDescription": "Charged when the Actor starts running. Number of events charged depends on Actor memory (one event per GB, minimum one event).",
                            "isOneTimeEvent": true,
                            "eventPriceUsd": 0.00005
                        },
                        "apify-default-dataset-item": {
                            "eventTitle": "result",
                            "eventDescription": "Single result in the default dataset.",
                            "eventTieredPricingUsd": {
                                "GOLD": {
                                    "tieredEventPriceUsd": 0.0002
                                },
                                "PLATINUM": {
                                    "tieredEventPriceUsd": 0.0002
                                },
                                "DIAMOND": {
                                    "tieredEventPriceUsd": 0.0002
                                },
                                "SILVER": {
                                    "tieredEventPriceUsd": 0.0003
                                },
                                "BRONZE": {
                                    "tieredEventPriceUsd": 0.0004
                                },
                                "FREE": {
                                    "tieredEventPriceUsd": 0.0005
                                }
                            }
                        }
                    }
                },
                "startedAt": "2025-12-13T18:38:52.654Z",
                "createdAt": "2025-12-13T18:38:52.068Z",
                "apifyMarginPercentage": 0.2
            }
        },
        {
            "actor": {
                "_id": "ACTOR_ID_097",
                "isPublic": true,
                "isDeprecated": false,
                "featuredScore": 70,
                "notice": "NONE",
                "name": "actor-013",
                "userId": "ACTOR_ID_063",
                "resourceGroupId": null,
                "title": "Example Actor 34",
                "username": "example-user",
                "actorPermissionLevel": "LIMITED_PERMISSIONS",
                "pictureUrl": "https://example.s3.amazonaws.com/actor-image.png"
            },
            "runsStats": {
                "ABORTED": 6,
                "FAILED": 0,
                "SUCCEEDED": 207,
                "TIMED-OUT": 0,
                "TOTAL": 264,
                "RESULTS": 18117
            },
            "earningsStats": {
                "totalRevenueUsd": 310.14,
                "totalCostUsd": 6.41,
                "totalProfitUsd": 223.29
            },
            "usersStats": {
                "freeUsers": 39,
                "payingUsers": 20
            },
            "chargedResults": 9589,
            "currentPricingInfo": {
                "minimalMaxTotalChargeUsd": null,
                "pricingModel": "PAY_PER_EVENT",
                "isPriceChangeNotificationSuppressed": false,
                "pricingPerEvent": {
                    "ACTOR_ID_067": {
                        "apify-actor-start": {
                            "eventTitle": "Actor Start",
                            "eventDescription": "Charged when the Actor starts running. Number of events charged depends on Actor memory (one event per GB, minimum one event).",
                            "isOneTimeEvent": true,
                            "eventPriceUsd": 0.00005
                        },
                        "apify-default-dataset-item": {
                            "eventTitle": "result",
                            "eventDescription": "Single result in the default dataset.",
                            "eventTieredPricingUsd": {
                                "GOLD": {
                                    "tieredEventPriceUsd": 0.0005
                                },
                                "PLATINUM": {
                                    "tieredEventPriceUsd": 0.0005
                                },
                                "DIAMOND": {
                                    "tieredEventPriceUsd": 0.0005
                                },
                                "SILVER": {
                                    "tieredEventPriceUsd": 0.00065
                                },
                                "BRONZE": {
                                    "tieredEventPriceUsd": 0.0008
                                },
                                "FREE": {
                                    "tieredEventPriceUsd": 0.00095
                                }
                            }
                        }
                    }
                },
                "startedAt": "2025-12-13T17:30:25.752Z",
                "createdAt": "2025-12-13T17:30:25.151Z",
                "apifyMarginPercentage": 0.2
            }
        },
        {
            "actor": {
                "_id": "ACTOR_ID_098",
                "isPublic": true,
                "isDeprecated": true,
                "featuredScore": 70,
                "notice": "NONE",
                "name": "actor-013",
                "userId": "ACTOR_ID_063",
                "resourceGroupId": null,
                "title": "Example Actor 35",
                "username": "example-user",
                "actorPermissionLevel": "LIMITED_PERMISSIONS",
                "pictureUrl": "https://example.s3.amazonaws.com/actor-image.png"
            },
            "runsStats": {
                "ABORTED": 6,
                "FAILED": 0,
                "SUCCEEDED": 207,
                "TIMED-OUT": 0,
                "TOTAL": 264,
                "RESULTS": 18117
            },
            "earningsStats": {
                "totalRevenueUsd": 310.14,
                "totalCostUsd": 6.41,
                "totalProfitUsd": 223.29
            },
            "usersStats": {
                "freeUsers": 39,
                "payingUsers": 20
            },
            "chargedResults": 9589,
            "currentPricingInfo": {
                "minimalMaxTotalChargeUsd": null,
                "pricingModel": "PAY_PER_EVENT",
                "isPriceChangeNotificationSuppressed": false,
                "pricingPerEvent": {
                    "ACTOR_ID_067": {
                        "apify-actor-start": {
                            "eventTitle": "Actor Start",
                            "eventDescription": "Charged when the Actor starts running. Number of events charged depends on Actor memory (one event per GB, minimum one event).",
                            "isOneTimeEvent": true,
                            "eventPriceUsd": 0.00005
                        },
                        "apify-default-dataset-item": {
                            "eventTitle": "result",
                            "eventDescription": "Single result in the default dataset.",
                            "eventTieredPricingUsd": {
                                "GOLD": {
                                    "tieredEventPriceUsd": 0.0003
                                },
                                "PLATINUM": {
                                    "tieredEventPriceUsd": 0.0003
                                },
                                "DIAMOND": {
                                    "tieredEventPriceUsd": 0.0003
                                },
                                "SILVER": {
                                    "tieredEventPriceUsd": 0.0004
                                },
                                "BRONZE": {
                                    "tieredEventPriceUsd": 0.0005
                                },
                                "FREE": {
                                    "tieredEventPriceUsd": 0.0006
                                }
                            }
                        }
                    }
                },
                "startedAt": "2025-12-13T17:49:33.651Z",
                "createdAt": "2025-12-13T17:49:33.012Z",
                "apifyMarginPercentage": 0.2
            }
        },
        {
            "actor": {
                "_id": "ACTOR_ID_099",
                "isPublic": true,
                "isDeprecated": false,
                "featuredScore": 70,
                "notice": "NONE",
                "name": "actor-013",
                "userId": "ACTOR_ID_063",
                "resourceGroupId": null,
                "title": "Example Actor 36",
                "username": "example-user",
                "actorPermissionLevel": "LIMITED_PERMISSIONS"
            },
            "runsStats": {
                "ABORTED": 6,
                "FAILED": 0,
                "SUCCEEDED": 207,
                "TIMED-OUT": 0,
                "TOTAL": 264,
                "RESULTS": 18117
            },
            "earningsStats": {
                "totalRevenueUsd": 310.14,
                "totalCostUsd": 6.41,
                "totalProfitUsd": 223.29
            },
            "usersStats": {
                "freeUsers": 39,
                "payingUsers": 20
            },
            "chargedResults": 9589,
            "currentPricingInfo": {
                "minimalMaxTotalChargeUsd": null,
                "pricingModel": "PAY_PER_EVENT",
                "isPriceChangeNotificationSuppressed": false,
                "pricingPerEvent": {
                    "ACTOR_ID_067": {
                        "apify-actor-start": {
                            "eventTitle": "Actor Start",
                            "eventDescription": "Charged when the Actor starts running. Number of events charged depends on Actor memory (one event per GB, minimum one event).",
                            "isOneTimeEvent": true,
                            "eventPriceUsd": 0.00005
                        },
                        "apify-default-dataset-item": {
                            "eventTitle": "result",
                            "eventDescription": "Single result in the default dataset.",
                            "eventTieredPricingUsd": {
                                "GOLD": {
                                    "tieredEventPriceUsd": 0.0009
                                },
                                "PLATINUM": {
                                    "tieredEventPriceUsd": 0.0009
                                },
                                "DIAMOND": {
                                    "tieredEventPriceUsd": 0.0009
                                },
                                "SILVER": {
                                    "tieredEventPriceUsd": 0.001
                                },
                                "BRONZE": {
                                    "tieredEventPriceUsd": 0.0011
                                },
                                "FREE": {
                                    "tieredEventPriceUsd": 0.0012
                                }
                            }
                        },
                        "enriched-profile": {
                            "eventTitle": "Enrich profile",
                            "eventDescription": "Enrich profile data",
                            "isOneTimeEvent": false,
                            "eventTieredPricingUsd": {
                                "GOLD": {
                                    "tieredEventPriceUsd": 0.001
                                },
                                "PLATINUM": {
                                    "tieredEventPriceUsd": 0.001
                                },
                                "DIAMOND": {
                                    "tieredEventPriceUsd": 0.001
                                },
                                "SILVER": {
                                    "tieredEventPriceUsd": 0.0015
                                },
                                "BRONZE": {
                                    "tieredEventPriceUsd": 0.002
                                },
                                "FREE": {
                                    "tieredEventPriceUsd": 0.0025
                                }
                            }
                        }
                    }
                },
                "startedAt": "2025-12-20T17:54:09.656Z",
                "createdAt": "2025-12-20T17:54:10.651Z",
                "apifyMarginPercentage": 0.2
            }
        },
        {
            "actor": {
                "_id": "ACTOR_ID_100",
                "isPublic": true,
                "isDeprecated": true,
                "featuredScore": 70,
                "notice": "UNDER_MAINTENANCE",
                "name": "actor-014",
                "userId": "ACTOR_ID_063",
                "resourceGroupId": null,
                "title": "Example Actor 37",
                "username": "example-user",
                "actorPermissionLevel": "LIMITED_PERMISSIONS",
                "pictureUrl": "https://example.s3.amazonaws.com/actor-image.png"
            },
            "runsStats": {},
            "earningsStats": {
                "totalRevenueUsd": 310.14,
                "totalCostUsd": 6.41,
                "totalProfitUsd": 223.29
            },
            "usersStats": {
                "freeUsers": 39,
                "payingUsers": 20
            },
            "chargedResults": 9589,
            "currentPricingInfo": {
                "pricePerUnitUsd": 7,
                "trialMinutes": 1440,
                "pricingModel": "FLAT_PRICE_PER_MONTH",
                "isPriceChangeNotificationSuppressed": false,
                "startedAt": "2026-01-08T18:12:48.747Z",
                "createdAt": "2026-01-08T18:12:51.245Z",
                "apifyMarginPercentage": 0.2
            }
        },
        {
            "actor": {
                "_id": "ACTOR_ID_101",
                "isPublic": true,
                "isDeprecated": true,
                "featuredScore": 70,
                "notice": "UNDER_MAINTENANCE",
                "name": "actor-014",
                "userId": "ACTOR_ID_063",
                "resourceGroupId": null,
                "title": "Example Actor 38",
                "username": "example-user",
                "actorPermissionLevel": "LIMITED_PERMISSIONS",
                "pictureUrl": "https://example.s3.amazonaws.com/actor-image.png"
            },
            "runsStats": {},
            "earningsStats": {
                "totalRevenueUsd": 310.14,
                "totalCostUsd": 6.41,
                "totalProfitUsd": 223.29
            },
            "usersStats": {
                "freeUsers": 39,
                "payingUsers": 20
            },
            "chargedResults": 9589,
            "currentPricingInfo": {
                "pricePerUnitUsd": 7,
                "trialMinutes": 1440,
                "pricingModel": "FLAT_PRICE_PER_MONTH",
                "isPriceChangeNotificationSuppressed": false,
                "startedAt": "2026-01-08T18:39:51.774Z",
                "createdAt": "2026-01-08T18:39:53.078Z",
                "apifyMarginPercentage": 0.2
            }
        },
        {
            "actor": {
                "_id": "ACTOR_ID_102",
                "isPublic": true,
                "isDeprecated": false,
                "featuredScore": 70,
                "notice": "NONE",
                "name": "actor-014",
                "pictureUrl": "https://example.s3.amazonaws.com/actor-image.png",
                "actorPermissionLevel": "LIMITED_PERMISSIONS",
                "title": "Example Actor 39",
                "userId": "ACTOR_ID_063",
                "resourceGroupId": null,
                "username": "example-user"
            },
            "runsStats": {},
            "earningsStats": {
                "totalRevenueUsd": 310.14,
                "totalCostUsd": 6.41,
                "totalProfitUsd": 223.29
            },
            "usersStats": {
                "freeUsers": 39,
                "payingUsers": 20
            },
            "chargedResults": 9589,
            "currentPricingInfo": {
                "minimalMaxTotalChargeUsd": null,
                "pricingModel": "PAY_PER_EVENT",
                "isPriceChangeNotificationSuppressed": false,
                "pricingPerEvent": {
                    "ACTOR_ID_067": {
                        "apify-actor-start": {
                            "eventTitle": "Actor Start",
                            "eventDescription": "Charged when the Actor starts running. Number of events charged depends on Actor memory (one event per GB, minimum one event).",
                            "isOneTimeEvent": true,
                            "eventPriceUsd": 0.00005
                        },
                        "apify-default-dataset-item": {
                            "eventTitle": "result",
                            "eventDescription": "Single result in the default dataset.",
                            "eventTieredPricingUsd": {
                                "FREE": {
                                    "tieredEventPriceUsd": 0.005
                                },
                                "BRONZE": {
                                    "tieredEventPriceUsd": 0.004
                                },
                                "SILVER": {
                                    "tieredEventPriceUsd": 0.003
                                },
                                "GOLD": {
                                    "tieredEventPriceUsd": 0.002
                                },
                                "PLATINUM": {
                                    "tieredEventPriceUsd": 0.002
                                },
                                "DIAMOND": {
                                    "tieredEventPriceUsd": 0.002
                                }
                            },
                            "isPrimaryEvent": true
                        }
                    }
                },
                "startedAt": "2026-03-19T01:32:54.408Z",
                "createdAt": "2026-03-19T01:32:54.520Z",
                "apifyMarginPercentage": 0.2
            }
        }
    ],
    "currentMonthProfitUsd": 1109.904125412965,
    "previousMonthProfitUsd": 2637.8662435157157
}
 */