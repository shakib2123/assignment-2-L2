"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidationSchema = void 0;
const zod_1 = require("zod");
exports.productValidationSchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
    }),
    description: zod_1.z.string({
        required_error: 'Description is required',
        invalid_type_error: 'Description must be a string',
    }),
    price: zod_1.z.number({
        required_error: 'Price is required',
        invalid_type_error: 'Price must be a number',
    }),
    category: zod_1.z.string({
        required_error: 'Category is required',
        invalid_type_error: 'Category must be a string',
    }),
    tags: zod_1.z.array(zod_1.z.string({
        required_error: 'Tags is required',
        invalid_type_error: 'Tags must be an array',
    })),
    variants: zod_1.z.array(zod_1.z.object({
        type: zod_1.z.string({
            required_error: 'Type is required',
            invalid_type_error: 'Type must be a string',
        }),
        value: zod_1.z.string({
            required_error: 'Value is required',
            invalid_type_error: 'Value must be a string',
        }),
    })),
    inventory: zod_1.z.object({
        quantity: zod_1.z.number({
            required_error: 'Quantity is required',
            invalid_type_error: 'Quantity must be a number',
        }),
        inStock: zod_1.z.boolean({
            required_error: 'InStock is required',
            invalid_type_error: 'InStock must be a boolean',
        }),
    }),
});
