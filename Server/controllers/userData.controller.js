
const fetchTeam = async (req, res) => {
  try {
    const team = await userTeam.findById({_id: id});
    res.send(team);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

const createNewTeam = async (req, res) => {
  try {
    const { title, username } = req.body;
    const team = await userTeam.create({ title: title, username: username });
    res.status(201);
    res.send(team);
  } catch (error) {
    console.log(error)
    res.sendStatus(500);
  }
}

const addRider = async (req, res) => {
  try {
    const { id, rider } = req.params;
    const team = await userTeam.findOneAndUpdate(
      { _id: id }, //mongoose db starts with underscore
      { $push: { rider: rider }}, 
      { new: true}); //options object -> new to true fixes async update thing
    res.send(team); // will automatically send status 200
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}


const removeRider = async (req, res) => {
  try {
    const { id, rider } = req.params;
    const team = await userTeam.findOneAndUpdate(
      { _id: id }, //mongoose db starts with underscore
      { $pull: { rider: rider }}, 
      { new: true}); //options object -> new to true fixes async update thing
    res.send(team); // will automatically send status 200
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export {fetchTeam, createNewTeam, addRider, removeRider}