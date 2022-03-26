const User = require("../models/UserSchema");

const createHost = async(req,res)=>{
    const {phone, gender, idProof, profilePic,hostType,interest,hostBio,latitude,longitude} = req.body;
    if (!phone || !gender || !idProof || !profilePic || !hostType || !interest || !hostBio)
    res.status(422).send("Enter all fields");
    const location={
        latitude,longitude
    }
    try {
        const userExists = await User.findOne({ _id:req.user._id });
    if (userExists && !(req.user.isHost)) {
        const updateDetails = await User.findByIdAndUpdate(req.user._id,{phone, gender, idProof, profilePic,hostType,interest,hostBio, isPending:true,location});
        if(updateDetails) return res.status(200).send({ ok: true, message: "Details Updated" });
    } else{
        return res
        .status(200)
        .send({ ok: false, message: "You are already a host" });
    }
    } catch (error) {
        console.log("Error", error);
    }
}

const getPendingHosts = async(req,res)=>{
    try {
        const allHosts = await User.find({isPending:true})
        return res.status(200).send({ ok: true, message: "All Pending Hosts",allHosts });
    } catch (error) {
        console.log(error)
    }
}

const getHost = async(req,res)=>{
    const {id} = req.params
    try {
        const currentHost = await User.find({id});
        if(currentHost[0].isHost) return res.status(200).send({ ok: true, message: "Got Host",currentHost });
        else{
            return res.status(200).send({ ok: false, message: "Not a Host" });
        }
    } catch (error) {
        console.log(error)
    }
}

const approveHost = async(req,res)=>{
    try {
        const {_id} = req.body;
        const host = await User.find({_id});
        if(host[0].isPending){
            const approve = await User.findByIdAndUpdate(_id,{isHost:true,isPending:false});
            if(approve) return res.status(200).send({ ok: true, message: "Host Approved" });
        }else{
            return res.status(200).send({ ok: false, message:"Something is wrong" });
        }
    } catch (error) {
        console.log(error)
    }
}

const rejectHost = async(req,res)=>{
    try {
        const {_id} = req.body;
        const host = await User.find({_id});
        if(host[0].isPending){
            const approve = await User.findByIdAndUpdate(_id,{isRejected:true});
            if(approve) return res.status(200).send({ ok: true, message: "Host Rejected" });
        }else{
            return res.status(200).send({ ok: false, message:"Something is wrong" });
        }
    } catch (error) {
        console.log(error)
    }
}

const getAllHosts = async(req,res)=>{
    try {
        const hosts = await User.find({isHost:true})
        if(hosts) return res.status(200).send({ ok: true, message: "All Hosts", hosts });
        else{
            return res.status(200).send({ ok: false, message:"Null" });
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createHost,
    getPendingHosts,
    getHost,
    approveHost,
    rejectHost,
    getAllHosts
  };
//   {
//     "phone": 12312323,
//     "gender": "male",
//     "idProof": "https://boo.io",
//     "profilePic": "sdjhfksadhf",
//     "hostType": "both",
//     "interest": "no",
//     "hostBio": "dskafhuiefjdskfneu. jkffjsdi fewiuffndsi feifdsfpue fsdifn weffsd fiewff dsfneuf ewfksdjf pifndskfneurf dskjnf eiuf dsjfewufbs f. fhskdjf feufh",
//     "latitude": "18.494678950275866",
//     "longitude": "74.01965520536156"
// }