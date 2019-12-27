<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
use Validator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $products = Product::where('status', 1)->get();
        return response()->json($products);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'sku' => 'unique:products',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages(), 200);
        } else {
            $product = new Product;
            $product->sku = $request->input('sku');
            $product->title = $request->input('title');
            $product->amount = $request->input('amount');
            $product->stocks = $request->input('stocks');
            $product->body = $request->input('body');
            $product->save();
            return response()->json(['message' => 'Success'], 200);
        }
    }

    public function storeImage(Request $request) {


    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $products = Product::where('sku', $id)->where('status', 1)->first();
        return response()->json($products);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $validator = Validator::make($request->all(), [
            'sku' => 'unique:products,id,'. $id
        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages(), 200);
        } else {
            $product = Product::find($id);
            $product->sku = $request->input('sku');
            $product->title = $request->input('title');
            $product->amount = $request->input('amount');
            $product->stocks = $request->input('stocks');
            $product->body = $request->input('body');
            $product->update();
            return response()->json(['message' => 'Success'], 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $product = Product::find($id)->update(['status' => 0]);
        return response()->json(['message' => 'Success'], 200);
    }
}
