import express, { Router } from 'express';
import faker from 'faker';
import axios from 'axios';

interface IMediaTypesContraints {
    region: string;
    expire: string;
}

interface ISplitRules {
    type: string;
    split: number[];
}

interface IProject {
    id: string;
    summary: {
        title: string;
        overview: string;
        release_date: string;
        format: string;
        producer: string;
        co_producer: string[];
        distribution: string[];
        split_rules: ISplitRules[];
        special_rules: string[];
    };
    contracts: {
        type: string;
        changes: [
            {
                category: string;
                new_value: number;
            },
        ];
        constraints: {
            medias: {
                digital: {
                    vod: IMediaTypesContraints[];
                    tvod: IMediaTypesContraints[];
                    svod: IMediaTypesContraints[];
                    fvod: IMediaTypesContraints[];
                };
                conventional: {
                    open_tv: IMediaTypesContraints[];
                    paid_tv: IMediaTypesContraints[];
                    theaters: IMediaTypesContraints[];
                    home_video: IMediaTypesContraints[];
                };
            };
            dttm: string[];
        };
    };
}

const app = express();

const routes = Router();

async function postData(movies: Array<object>) {
    movies.forEach(async (movie) => {
        await axios.post('http://localhost:3333/projects', movie);
    });
}

async function getData() {
    const result = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=1dc4371418da9d51a8bd62e29fa4270d&language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=false&page=3');

    return result.data;
}


routes.get('/', async (req, res) => {
    const { results } = await getData();
    const movies = [];

    results.map(result => {
        const movie = {
            summary: {
                title: result.title,
                overview: result.overview,
                release_date: result.release_date,
                format: "13:26'",
                producer: faker.company.companyName(),
                co_producer: faker.company.companyName(),
                distribution: "Band",
                split_rules: [
                    {
                        type: "patrimonial_rights",
                        split: [(Math.random() * 100), (Math.random() * 100)]
                    },
                    {
                        type: "merchandise",
                        split: [(Math.random() * 100), (Math.random() * 100)]
                    }
                ]
            },
            contracts:{
                type: "distribution",
                constraints: {
                    medias: {
                        digital: {
                            vod: [
                                {
                                    region: faker.address.countryCode(),
                                    expire: faker.date.future()
                                },
                                {
                                    region: faker.address.countryCode(),
                                    expire: faker.date.future()
                                },
                                {
                                    region: faker.address.countryCode(),
                                    expire: faker.date.future()
                                },
                                {
                                    region: faker.address.countryCode(),
                                    expire: faker.date.future()
                                }
                            ],
                            tvod: [
                                {
                                    region: faker.address.countryCode(),
                                    expire: faker.date.future()
                                },
                                {
                                    region: faker.address.countryCode(),
                                    expire: faker.date.future()
                                },
                                {
                                    region: faker.address.countryCode(),
                                    expire: faker.date.future()
                                },
                                {
                                    region: faker.address.countryCode(),
                                    expire: faker.date.future()
                                },
                                {
                                    region: faker.address.countryCode(),
                                    expire: faker.date.future()
                                },
                            ],
                            svod: [{
                                region: faker.address.countryCode(),
                                expire: faker.date.future()
                            }],
                            fvod: [
                                {
                                    region: faker.address.countryCode(),
                                    expire: faker.date.future()
                                },
                                {
                                    region: faker.address.countryCode(),
                                    expire: faker.date.future()
                                },
                                {
                                    region: faker.address.countryCode(),
                                    expire: faker.date.future()
                                },
                                {
                                    region: faker.address.countryCode(),
                                    expire: faker.date.future()
                                }
                            ],

                        },
                        conventional: {
                            open_tv: [
                                {
                                    region: faker.address.countryCode(),
                                    expire: faker.date.future()
                                },
                                {
                                    region: faker.address.countryCode(),
                                    expire: faker.date.future()
                                },
                                {
                                    region: faker.address.countryCode(),
                                    expire: faker.date.future()
                                },
                                {
                                    region: faker.address.countryCode(),
                                    expire: faker.date.future()
                                },
                                {
                                    region: faker.address.countryCode(),
                                    expire: faker.date.future()
                                },
                                {
                                    region: faker.address.countryCode(),
                                    expire: faker.date.future()
                                },
                                {
                                    region: faker.address.countryCode(),
                                    expire: faker.date.future()
                                },
                                {
                                    region: faker.address.countryCode(),
                                    expire: faker.date.future()
                                },
                                {
                                    region: faker.address.countryCode(),
                                    expire: faker.date.future()
                                }
                            ],
                            paid_tv: [],
                            theaters: [
                                {
                                    region: faker.address.countryCode(),
                                    expire: faker.date.future()
                                },
                                {
                                    region: faker.address.countryCode(),
                                    expire: faker.date.future()
                                },
                            ],
                            home_video: []
                        }
                    },
                    dttm: [faker.date.recent(), faker.date.future()]
                }

            }
        }
        movies.push(movie);
    });

    postData(movies);

    res.json({message: true});
});

routes.post('/', (req, res) => {
    const data = 'a';

});

app.use(express.json());
app.use(routes);

app.listen(3334, () => {
    console.log('Listening at port 3334.');
});
