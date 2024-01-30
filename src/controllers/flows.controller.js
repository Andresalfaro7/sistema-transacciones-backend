import Flow from '../models/flow.model.js';

export const getFlows = async(req, res) =>{
    const flows = await Flow.find({ isDeleted: false });
    res.json(flows);
}   

export const createFlow = async(req, res) =>{
    const { nameFlow } = req.body;
    const newFlow = new Flow({
        nameFlow
    });
    const savedFlow = await newFlow.save();
    res.json(savedFlow);
}

export const getFlow = async(req, res) =>{
    const flow = await Flow.findById(req.params.id);
    if(!flow) return res.status(404).json({ message: "Flujo de efectivo no encontrado" });
    res.json(flow);
}

export const deleteFlow = async(req, res) =>{
    const flow = await Flow.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    if(!flow) return res.status(404).json({ message: "Flujo de efectivo no encontrado" });
    res.json(flow);
}

export const updateFlow = async(req, res) =>{
    const flow = await Flow.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    if(!flow) return res.status(404).json({ message: "Flujo de efectivo no enontrado" });
    res.json(flow);
}