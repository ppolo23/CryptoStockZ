import config from '../config';
import axios from 'axios';

export const GetUserInfo = (token, username) => {
    var options = {
        method: 'get',
        url: config.baseUrl + '/account/' + username,
        headers: {
            'x-access-token': token
        }
    };

    return new Promise((resolve, reject) => {
        axios(options)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
};

export const GetUserProducts = (token) => {
    var options = {
        method: 'get',
        url: config.baseUrl + '/account/products/all',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    };

    return new Promise((resolve, reject) => {
        axios(options)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });

};

export const GetAllProducts = (token) => {
    var options = {
        method: 'get',
        url: config.baseUrl + '/product',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    };

    return new Promise((resolve, reject) => {
        axios(options)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
};

export const GetProductInfo = (token, productId) => {
    var options = {
        method: 'get',
        url: config.baseUrl + '/product/' + productId,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    };

    return new Promise((resolve, reject) => {
        axios(options)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
};

export const GetUserWishlistProducts = (token, username) => {


    var options = {
        method: 'get',
        url: config.baseUrl + '/account/' + username + '/wishlist',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    };

    return new Promise((resolve, reject) => {
        axios(options)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });

};

export const CreateNewProduct = (token, name, ean, sku, manufacturer) => {
    var data = JSON.stringify(
        [
            {
                "name": name,
                "ean": ean,
                "sku": sku,
                "manufacturer": manufacturer
            }
        ]);

    var options = {
        method: 'post',
        url: config.baseUrl + '/base/product',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        data: data
    };

    return new Promise((resolve, reject) => {
        axios(options)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
};

export const UpdateProduct = (token, receiver, newDna, productId) => {
    var data = JSON.stringify(
        {
            "owner_address": receiver,
            "dna": newDna
        }
    );

    var options = {
        method: 'put',
        url: config.baseUrl + '/product/' + productId,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        data: data
    };

    return new Promise((resolve, reject) => {
        axios(options)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

export const CreateDigitalProduct = (token, idBaseProduct, productAddress, metamask, level, dna, uniqueId) => {
    var data = JSON.stringify(
        {
            "id": idBaseProduct,
            "address": productAddress,
            "owner_address": metamask,
            "level": level,
            "dna": dna,
            "uniqueIdentificator": uniqueId
        }
    );

    console.log(data);
    var options = {
        method: 'post',
        url: config.baseUrl + '/product',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        data: data
    };
    console.log("Options: " + options)

    return new Promise((resolve, reject) => {
        axios(options)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
}

export const GetPendingProducts = (token) => {
    var options = {
        method: 'get',
        url: config.baseUrl + '/base/product/pending',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    };

    return new Promise((resolve, reject) => {
        axios(options)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });

};

export const GetManufacturers = (token) => {
    var options = {
        method: 'get',
        url: config.baseUrl + '/manufacturers',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    };
    return new Promise((resolve, reject) => {
        axios(options)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
};

export const VerifyProduct = (token, base_productId) => {

    var options = {
        method: 'put',
        url: config.baseUrl + '/base/product/pending/' + base_productId,
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        },
    };

    return new Promise((resolve, reject) => {
        axios(options)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
};

export const GetBaseProductsByUser = (token) => {
    var options = {
        method: 'get',
        url: config.baseUrl + '/base/product',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    };
    return new Promise((resolve, reject) => {
        axios(options)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
};

export const GetBaseProducts = (token) => {
    var options = {
        method: 'get',
        url: config.baseUrl + '/base/products',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    };
    return new Promise((resolve, reject) => {
        axios(options)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
};

export const AddProductToWishList = (token, productId) => {
    var options = {
        method: 'put',
        url: config.baseUrl + '/product/' + productId + '/wishlist',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    };

    return new Promise((resolve, reject) => {
        axios(options)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
};

export const DeleteProductFromWishList = (token, productId) => {
    var options = {
        method: 'delete',
        url: config.baseUrl + '/product/' + productId + '/wishlist',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    };

    return new Promise((resolve, reject) => {
        axios(options)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
};

export const CheckProductInWish = (token, productId) => {
    var options = {
        method: 'get',
        url: config.baseUrl + '/product/' + productId + '/wishlist',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    };

    return new Promise((resolve, reject) => {
        axios(options)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
};

export const SigninUser = (username, password) => {
    var payload = {
        "username": username,
        "password": password
    }

    var options = {
        method: 'post',
        url: config.baseUrl + '/signin',
        headers: {
            'Content-Type': 'application/json'
        },
        data: payload
    };


    return new Promise((resolve, reject) => {
        axios(options)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
};

export const SignUpUser = (username, email, password, name, account) => {
    var payload = {
        "username": username,
        "email": email,
        "password": password,
        "name": name,
        "roles": ["user"],
        "metamaskAccount": account
    }
    var options = {
        method: 'post',
        url: config.baseUrl + '/signup',
        headers: {
            'Content-Type': 'application/json'
        },
        data: payload
    };

    return new Promise((resolve, reject) => {
        axios(options)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
};

export const SearchInBack = (token, baseProductId, manufacturerId) => {
    var params =
    {
        baseProductId: baseProductId,
        manufacturerId: manufacturerId
    };

    var options = {
        method: 'get',
        url: config.baseUrl + '/product/search',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        params: params
    };
    console.log(options)
    return new Promise((resolve, reject) => {
        axios(options)
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
    });
};
