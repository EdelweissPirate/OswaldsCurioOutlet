import { 
    FaFlask, 
    FaRing, 
    FaHammer, 
    FaStar, 
    FaSuitcase, 
    FaBomb, 
    FaHatWizard,
    FaMitten,
    FaToolbox,
    FaCrow,
    FaCampground,
    FaDiceD20,
    FaMenorah,
    FaShoppingBag,
    FaShieldAlt,
    FaScroll,
    FaMagic,
    FaGem,
    FaDrum
} from 'react-icons/fa'

import { useEffect, useState } from "react"

import PropTypes from "prop-types";

const iconMap = {
    'adventuring-gear': <FaCampground />,
    'ammunition': <FaBomb />,
    'arcane-foci': <FaHatWizard />,
    'armor': <FaMitten />,
    'tools': <FaToolbox />,
    'druidic-foci': <FaCrow />,
    'equipment-packs': <FaSuitcase />,
    'gaming-sets': <FaDiceD20 />,
    'holy-symbols': <FaMenorah />,
    'musical-instruments': <FaDrum />,
    'kits': <FaShoppingBag />,
    'scroll': <FaScroll />,
    'shields': <FaShieldAlt />,
    'ring': <FaRing />,
    'weapon': <FaHammer />,
    'potion': <FaFlask />,
    'wand': <FaMagic />,
    'wondrous-items': <FaGem />
};

function ItemIcon({ itemType }) {
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        setSelected(iconMap[itemType] || <FaStar />);
    }, [itemType]);

    return (
        <>
            {selected}
        </>
    );
}

ItemIcon.propTypes = {
    itemType: PropTypes.string
}

export default ItemIcon