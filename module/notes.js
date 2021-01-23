const { Notes, Users } = require('../models/index');


exports.addNotes=async (text, title, userId) =>{

    return await Notes.create({text:text, title:title, userId:userId});
      
 
 }

 exports.getNotesofUser = async(userId, limit, offset)=>{


     return await Notes.findAndCountAll({
         where:{userId:userId},
         limit:limit,
         offset:offset
     })


 }

 exports.deleteNotes = async(id, userId)=>{

    const result  = await Notes.findOne({
        where: {
            id:id
        }
    });

     if(!result){
         throw {msg:'No Notes Found'};
     }
    if(result.dataValues.userId!==userId){
        throw {msg:'Not Authorized'};
    }


     return await Notes.destroy({
         where:{
             id:id,
             userId:userId
            }
     })
 }

 exports.updateNotes= async(id, newTitle, newText, userId)=>{

    
    
    const result  = await Notes.findOne({
        where: {
            id:id
        }
    });

     if(!result){
         throw {msg:'No Notes Found'};
     }
    if(result.dataValues.userId!==userId){
        throw {msg:'Not Authorized'};
    }

     const {title, text} = result.dataValues
     const updationTitle=newTitle? newTitle:title;
     const updationText =newText? newText:text;

     return await Notes.update({
         title:updationTitle,
         text:updationText
     },{
    
     where:{id:id}
     })

}