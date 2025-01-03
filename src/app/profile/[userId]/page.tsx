export default function DynamicPage({params}:any){
    return(
        <div className="flex justify-center flex-col min-h-screen items-center rounded-md px-4 py-2">
            Profile Page
            <p className="p-3 bg-green-500 rounded-lg text-black">{params.userId}</p>
        </div>
    )
}