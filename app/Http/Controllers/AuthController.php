<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
//use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{
    /*Registration Process*/

    public function getRegistration()
    {
        return view('auth.registration');
    }

    public function postRegistration(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = new User();
        $user->fill($request->all());

        if ($image = $request->file('image')) {
            $name = Str::random(16) . '.' . $image->getClientOriginalExtension();
            $image->storePubliclyAs('public/images/profile_images', $name);
            $user->image_path = $name;
        }

        $user->save();

        auth()->login($user);

        return redirect()->route('recipes.index')->with('success', 'Successfully registered');
    }


    /*Login Process*/

    public function getLogin()
    {
        return view('auth.login');
    }

    public function postLogin(Request $request)
    {
        $this->validate($request, [

            'email' => 'required|email',
            'password' => 'required',
        ]);

        $credentials = $request->only(['email','password']);

        if (auth()->attempt($credentials, $request->has('remember_me'))) {

            return redirect()->route('recipes.index')->with('success', 'Logged in');

        } else {

            return redirect()->route('auth.getLogin')->with('error', 'Invalid credentials!');
        }
    }

    public function logout()
    {
        auth()->logout();

        return redirect()->route('auth.getLogin')->with('success', 'Logged out');
    }
}
