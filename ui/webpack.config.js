import path, {dirname} from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";


let __filename = fileURLToPath(import.meta.url);
let __dirname = dirname(__filename);
console.log(path.join(__dirname, "src"));
export default {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    resolve:{
        enforceExtension: false
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            ["@babel/preset-react", {"runtime": "automatic"}]
                        ],
                    }
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },            
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: 'src/index.html'
        })
    ],    
    devServer: {
        // compress: true,
        // hot: true,
        static: {
            directory: path.join(__dirname, 'dist'),
        },        
        port: 3000,
        historyApiFallback: true
    }
};
